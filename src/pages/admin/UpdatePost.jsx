import AdminSidebar from "../../components/navigation/AdminSidebar";
import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import useAdminAxiosPrivate from "../../hooks/useAdminAxiosPrivate";
import "../../assets/styles/admin.css";

const UpdatePost = () => {
  const axiosPrivate = useAdminAxiosPrivate();
  const errRef = useRef();

  const [post, setPost] = useState("");
  const [postId, setPostId] = useState(1);
  const [title, setTitle] = useState(undefined);
  const [datePosted, setDatePosted] = useState(undefined);
  const [postUrl, setPostUrl] = useState();
  const [description, setDescription] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [title, datePosted, postUrl, description, selectedImage, postId]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleTextarea = (e) => {
    setDescription(e.target.value);
  };

  const getPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`blog/post/${postId}`);
      if (!response.data) alert("Post does not exist");
      setPost(response?.data);
    } catch (err) {
      setErrMsg("Post does not exist");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.patch(
        `blog/update/${postId}`,
        JSON.stringify({ title, datePosted, postUrl, description }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      if (selectedImage) await imageUpload(response?.data.id);
      setPost(response?.data);
      alert(`${post.title} successfully updated!`);
      setErrMsg("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Credentials");
      } else if (err.response?.status === 403) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Update Failed");
      }
      errRef.current.focus();
    }
  };

  const imageUpload = async (id) => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    if (!selectedImage) return;
    try {
      await axios.patch(`blog/upload/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
    } catch (err) {
      setErrMsg("Image upload Failed");
      errRef.current.focus();
    }
  };

  return (
    <div id='wrapper'>
      <AdminSidebar />
      <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
        <div className='pt-3 pb-2 mb-3 border-bottom'>
          <h1 className='text-center'>Post Update</h1>
        </div>

        <div className='p-3 pb-md-4 mx-auto row'>
          {/* Search filter for posts */}
          <div className='mb-4'>
            <form onSubmit={getPost}>
              <div className='row g-3'>
                <div className='col-sm-4'>
                  <div className='input-group mb-3'>
                    <input
                      type='number'
                      className='form-control bg-dark text-white'
                      aria-label='Post Id'
                      onChange={(e) => setPostId(e.target.value)}
                      value={postId}
                      placeholder='Post ID'
                      required
                    />
                  </div>
                </div>
                <div className='col-sm-3'>
                  <button className='btn bg-dark text-white btn-md'>
                    Find Post
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Form for updating post */}
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          {post && (
            <form onSubmit={handleSubmit}>
              <div className='row g-3'>
                <div className='col-sm-7'>
                  <div className='input-group mb-2'>
                    <span className='input-group-text bg-dark text-white'>
                      Title
                    </span>
                    <input
                      type='text'
                      className='form-control bg-dark text-white'
                      placeholder={post.title}
                      aria-label='Post Title'
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                  </div>
                </div>

                <div className='col-sm-5'>
                  <div className='input-group mb-2'>
                    <span className='input-group-text bg-dark text-white'>
                      Date Published
                    </span>
                    <input
                      type='date'
                      className='form-control bg-dark text-white'
                      aria-label='Publication Date'
                      onChange={(e) => setDatePosted(e.target.value)}
                      value={datePosted}
                    />
                  </div>
                </div>

                <div className='col-sm-7'>
                  <div className='input-group mb-2'>
                    <input
                      type='text'
                      className='form-control bg-dark text-white'
                      id='demo-postUrl'
                      onChange={(e) => setPostUrl(e.target.value)}
                      value={postUrl}
                      placeholder={post.postUrl}
                    />
                    <span className='input-group-text bg-dark text-white'>
                      Post URL
                    </span>
                  </div>
                </div>

                <div className='col-sm-5'>
                  <div className='input-group mb-2'>
                    <span
                      className='input-group-text bg-dark text-white'
                      id='image'>
                      Upload Image
                    </span>
                    <input
                      type='file'
                      className='form-control bg-dark text-white'
                      id='image'
                      accept='image/*'
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className='col-sm-12 mb-2'>
                  <div className='input-group'>
                    <span className='input-group-text bg-dark text-white'>
                      Description
                    </span>
                    <textarea
                      className='form-control bg-dark text-white'
                      aria-label='Description'
                      value={description}
                      onChange={handleTextarea}
                      defaultValue={post.description}
                    />
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <button className='btn bg-danger text-white btn-lg w-50'>
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default UpdatePost;
