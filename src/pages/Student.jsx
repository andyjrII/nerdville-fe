import '../assets/styles/student.css';
import Navigation from '../components/navigation/Navigation';
import StudentSidebar from '../components/navigation/StudentSidebar';
import Footer from '../components/Footer';
import Welcome from '../components/Welcome';
import EnrolledCourses from '../components/EnrolledCourses';

const Student = () => {
  return (
    <>
      <Navigation />
      <section className='row mb-0' id='student-section'>
        <aside className='col-md-1 student-left'>
          <StudentSidebar />
        </aside>
        <main className='col-md-11' id='student-main'>
          <div className='row'>
            <div className='col p-5'>
              <Welcome />
            </div>
          </div>

          <div className='p-3 mx-3 shadow'>
            <EnrolledCourses />
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
};

export default Student;
