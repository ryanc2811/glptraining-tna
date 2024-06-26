import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import { Box, Typography, Paper, Grid,Button} from '@mui/material';
import MyCarousel from '../StyledComponents/MyCarousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination} from 'swiper/modules';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/pagination'; // Import pagination styles
import { BorderedBox } from '../StyledComponents/StyledBox'; 
import '../../styles/CustomSwiperStyle.css'
const Results = () => {
  const { resultId } = useParams();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skills, setSkills] = useState({ topSkills: [], skillsToImprove: [] });

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'tna_results', resultId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        await fetchCourses(data.predicted_courses);
        const skillsToImprove = data.skills_to_improve.map(skill => skill.replace(/_/g, ' '));
        const topSkills = data.top_skills.map(skill => skill.replace(/_/g, ' '));

      // Remove duplicates and prioritize skills to improve
      const uniqueSkillsToImprove = [...new Set(skillsToImprove)];
      const uniqueTopSkills = [...new Set(topSkills)].filter(skill => !uniqueSkillsToImprove.includes(skill));

      setSkills({
        topSkills: uniqueTopSkills.slice(0, 3),
        skillsToImprove: uniqueSkillsToImprove.slice(0, 3),
        allTopSkills: uniqueTopSkills,
        allSkillsToImprove: uniqueSkillsToImprove
      });
        setIsLoading(false);
      } else {
        console.log("No such document!");
        setIsLoading(false);
      }
    };

    const fetchCourses = async (courseIds) => {
      const coursesData = await Promise.all(courseIds.map(async (id) => {
        const courseRef = doc(db, 'courses', id);
        const courseSnap = await getDoc(courseRef);
        return courseSnap.exists() ? courseSnap.data() : null;
      }));

      setCourses(coursesData.filter(course => course));
    };

    fetchData();
  }, [resultId]);

  const truncateDescription = (description, limit = 50) => {
    return description.split(" ").slice(0, limit).join(" ") + "...";
  };
  return (
    <Grid
    container
    component="main"
    sx={{
      height: { xs: "90vh", sm: "100vh", md: "100vh" },
      position: "relative",
      padding: { md: "2vh" },
    }}
  >
    <MyCarousel></MyCarousel>
      <Grid item xs={12} sm={12} md={7} component={Paper} elevation={6} square>
      <Box
          sx={{
            my: { xs: 5, sm: 5, md: 5 },
            mx: { xs: 2, sm: 5, md: 5 },
            
            flexDirection: "column",
            alignItems: "left",
          }}
        >
      <Typography sx={{color:'text.main'}} variant="h3" gutterBottom>Your Recommended Courses</Typography>
          {isLoading ? (
            <Typography>Loading courses...</Typography>
          ) : (
            <Swiper modules={[Pagination]} spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }}>
              {courses.map((course, index) => (
                <SwiperSlide key={index}>
                  <BorderedBox sx={{ textAlign: 'left', mt:2}}>
                    <Typography variant="h6">{course.course_name}</Typography>
                    <Typography variant="body2">{truncateDescription(course.course_description)}</Typography>
                    <Typography variant="subtitle1">Level {course.course_metadata.level}</Typography>
                    <Button href={course.course_metadata.url} variant="contained" sx={{ mt:2, mb:5 }}>Go to Course</Button>
                    </BorderedBox>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
         
         <Grid container spacing={2}>
         <Grid item xs={12}  md={6}lg={6}>
        <Typography variant="h6" sx={{ mt: 4, mb: 2 ,fontWeight:'bold' }}>Top Skills</Typography>
        
          {skills.topSkills.map((skill, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1, bgcolor: 'primary.main', borderRadius: '10px', p: 1 }}>
              <Box sx={{ width: 30, height: 30, bgcolor: 'primary.dark', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
                <Typography variant="body1" color="white">{index + 1}</Typography>
              </Box>
              <Typography variant="body1" color="white">{skill}</Typography>
            </Box>
          ))}
        
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
        <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight:'bold' }}>Skills to Improve</Typography>
        
          {skills.skillsToImprove.map((skill, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1, bgcolor: 'error.main', borderRadius: '10px', p: 1 }}>
              <Box sx={{ width: 30, height: 30, bgcolor: 'error.dark', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
                <Typography variant="body1" color="white">{index + 1}</Typography>
              </Box>
              <Typography variant="body1" color="white">{skill}</Typography>
            </Box>
          ))}
        </Grid>
        </Grid>
      
      </Box>
   
    </Grid>
    </Grid>
  );
};

export default Results;
