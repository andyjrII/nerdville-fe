import '../assets/styles/student.css';
import { useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import useStudent from '../hooks/useStudent';
import storage from '../utils/storage';
import Moment from 'react-moment';
import Welcome from '../components/Welcome';
import EnrolledCourses from '../components/EnrolledCourses';
import NewestCourses from '../components/NewestCourses';
import MostEnrolled from '../components/MostEnrolled';
import CourseTotals from '../components/CourseTotals';
import { FaClock, FaEnvelope, FaPhone } from 'react-icons/fa';
import { IoLocation } from 'react-icons/io5';

const Student = () => {
  const axiosPrivate = useAxiosPrivate();

  const { auth, setAuth } = useAuth();
  const { student, setStudent } = useStudent(null);

  useEffect(() => {
    const storedAuth = storage.getData('auth');
    if (storedAuth) {
      setAuth(storedAuth);
    }

    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axiosPrivate.get(`students/${auth.email}`);
      setStudent(response?.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section id='student-section' className='border-top border-bottom'>
      <main id='student-main' className='mx-3 mb-3 pb-2'>
        <div className='container text-center mt-4'>
          <div className='row align-items-start'>
            <div className='col mb-2'>
              <button type='button' className='btn btn-primary'>
                {student.email}{' '}
                <span className='badge navy'>
                  <FaEnvelope />
                </span>
              </button>
            </div>
            <div className='col mb-2'>
              <button type='button' className='btn btn-primary'>
                {student.phoneNumber}{' '}
                <span className='badge navy'>
                  <FaPhone />
                </span>
              </button>
            </div>
            <div className='col mb-2'>
              <button type='button' className='btn btn-primary'>
                {student.address}{' '}
                <span className='badge navy'>
                  <IoLocation />
                </span>
              </button>
            </div>
            <div className='col'>
              <button
                type='button'
                className='btn btn-primary'
                title='Date Joined'
              >
                <Moment format='MMMM D, YYYY'>{student.createdAt}</Moment>{' '}
                <span className='badge navy'>
                  <FaClock />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className='p-3 mx-5'>
          <Welcome name={student.name} />
        </div>

        <CourseTotals />

        <div className='p-3 m-3 shadow rounded'>
          <EnrolledCourses email={student.email} />
        </div>

        <div className='p-3 m-3 shadow rounded'>
          <MostEnrolled />
        </div>

        <div className='p-3 m-3 shadow rounded'>
          <NewestCourses />
        </div>
      </main>
    </section>
  );
};

export default Student;
