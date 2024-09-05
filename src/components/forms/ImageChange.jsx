import { useState, useEffect } from 'react';
import { FcImageFile } from 'react-icons/fc';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import db from '../../utils/localBase';
import Swal from 'sweetalert2';

const ImageChange = () => {
  const axiosPrivate = useAxiosPrivate();
  const [fileName, setFileName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePath, setImagePath] = useState('');
  const [newImage, setNewImage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const initialize = async () => {
      try {
        await fetchEmail();
        if (email) await fetchImage();
      } catch (error) {
        console.log('Error during initialization:', error);
      }
    };
    initialize();
  }, [email, selectedImage]);

  const fetchEmail = async () => {
    const data = await db.collection('auth_student').get();
    setEmail(data[0].email);
  };

  const fetchImage = async () => {
    const localStudent = await db.collection('student').doc(email).get();
    setImagePath(localStudent.imagePath);
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedImage);
    try {
      const response = await axiosPrivate.patch(
        `students/upload/${email}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Image Changed',
        text: 'Your image has been changed successfully!',
        confirmButtonText: 'OK',
      });
      await db.collection('student').doc(email).update({
        imagePath: response.data,
      });
      setNewImage(response.data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message || 'Something went wrong!',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className='student-wrap py-4'>
      <h3 className='text-center mb-3 text-light'>Picture Change</h3>
      <img src={newImage || imagePath} alt='Student' className='img-fluid' />
      <form className='login-form rounded' onSubmit={handleImageSubmit}>
        <div className='form-group'>
          <div className='custom-file-input'>
            <input
              type='file'
              id='file-input'
              className='file-input'
              accept='image/*'
              onChange={handleImageChange}
              required
            />
            <label htmlFor='file-input' className='custom-file-label'>
              <div className='d-flex align-items-center justify-content-center'>
                <FcImageFile id='image-icon' />
              </div>
              {fileName || 'Choose an image'}
            </label>
          </div>
        </div>
        <div className='mt-2'>
          <button className='btn btn-primary rounded w-100 py-2'>
            Submit Image
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageChange;
