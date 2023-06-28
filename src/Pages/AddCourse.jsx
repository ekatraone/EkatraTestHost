import {
  AddCircleOutlineOutlined,
  KeyboardArrowLeftSharp,
  KeyboardArrowRightSharp,
  UploadOutlined,
  FolderOpenOutlined,
  PreviewOutlined,
  Close,
  ElevatorSharp,
} from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useEffect, useMemo, useState, useRef, useDebugValue } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Done from "../assets/Done.gif";
import { useAuth0 } from "@auth0/auth0-react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const AddCourse = () => {

  const [formContent, setFormContent] = useState({});
  const [days, setDays] = useState(7 );

  const [currentDay, setCurrentDay] = useState(1);

  const location = useLocation();
  const id = location.pathname.split("/")[3];
  let courseContent = "";

  typeof location.state === "string" &&
    (courseContent = JSON.parse(location.state));

  const [daysContent, setDaysContent] = useState({
    day1: [{ paragraph: "", media: "" }],
    day2: [{ paragraph: "", media: "" }],
    day3: [{ paragraph: "", media: "" }],
    day4: [{ paragraph: "", media: "" }],
    day5: [{ paragraph: "", media: "" }],
    day6: [{ paragraph: "", media: "" }],
    day7: [{ paragraph: "", media: "" }],
  });

  const { user } = useAuth0();
  const history = useHistory();

  let daysArr = new Array(days).fill("").map((val, idx) => idx + 1);

  const handleForm = (e) => {
    const valueF = e.target.value;
    const name = e.target.name;
    setFormContent(
      (value) =>
        (value = {
          ...value,
          [name]: valueF,
        })
    );
  };

  const categoryOptions = useMemo(() => {
    return [
      { value: "Selected", label: "Select a Category" },
      { value: "Programming", label: "Programming" },
      { value: "WildLife", label: "WildLife" },
      { value: "Environment", label: "Environment" },
    ];
  }, []);

  const LanguageOptions = useMemo(() => {
    return [
      { value: "Selected", label: "Select a Language" },
      { value: "English", label: "English" },
      { value: "Hindi", label: "Hindi" },
      { value: "Marathi", label: "Marathi" },
    ];
  }, []);

  const handleDaysData = (index, e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(name,value.split(" ").length)
    setDaysContent((previousVal) => {
      return {
        ...previousVal,
        ["day" + currentDay]: previousVal["day" + currentDay].map(
          (item, idx) => {
            if (idx === index) {
              return {
                ...item,
                [name]: value,
              };
            } else {
              return item;
            }
          }
        ),
      };
    });
  };


  // Sathvik Added
  
  const carouselContainerRef = useRef(null);

  const handleClick=(string)=>{
    const carouselContainer = carouselContainerRef.current;
    const daySectionWidth = carouselContainer.offsetWidth / daysArr.length;
    if (string === "next" && currentDay < daysArr.length) {
      setCurrentDay((previousVal) => previousVal + 1);
      // resize the carousel container according to the screen size
      carouselContainer.scrollBy(daySectionWidth, 0);
      if (currentDay === daysArr.length - 1) {
        carouselContainer.scrollBy(0, 0);
      }
    } 
    else if(string === "prev" && currentDay > 1){
      setCurrentDay((previousVal) => previousVal - 1);
      carouselContainer.scrollBy(-daySectionWidth, 0);
    }
  }

  // Create an list which stores the file names of the uploaded files
  // Save the filename and the day it is getting uploaded to in an array
  const [file,setFile]=useState({name:""});
  const [activeIndex,setActiveIndex]=useState(-1);
  const handleUpload=(index,event)=>{
    setActiveIndex(index);
    window.removeEventListener("focus",handleFocusBack);
  }

  const handleFocusBack=()=>{
    setActiveIndex(-1);
    window.removeEventListener("focus",handleFocusBack);
  }

  const handleChange = event => {
    if(!event.target.files[0]){
      window.removeEventListener("focus",handleFocusBack);
      return
    }
    else{
      setFile(event.target.files[0]);
      console.log(file);
      handleFileUpload();
    }
  };


  const firebaseConfig = {
    apiKey: "AIzaSyAxyKGSMzIqNx_w7IYh4poRXn02N5yf4Wk",
    authDomain: "ekatraplatform.firebaseapp.com",
    projectId: "ekatraplatform",
    storageBucket: "ekatraplatform.appspot.com",
    messagingSenderId: "1015861767798",
    appId: "1:1015861767798:web:fd3565f9c3d3865541f957",
    measurementId: "G-TMXY1G6QL5"
  };
  const fileTypes=[ ".pdf",".mp3",".jpg",".jpeg",".png",".gif",".mp4",".mkv",".avi",".mov",".mp3",".wav",".ogg",".aac" ]
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const [uploading, setUploading] = useState(false);
  const [downURL,setDownURL] = useState("");
  const [progress, setProgress] = useState(0);
  const uploadFile = (index,event) => {
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setDownURL(downloadURL);
          setUploading(false);
          console.log(downURL);
          setDaysContent((previousVal) => {
            return {
              ...previousVal,
              ["day" + currentDay]: previousVal["day" + currentDay].map( 
                (item, idx) => {
                  if (idx === index) {
                    return {
                      ...item,
                      media: downloadURL,
                    };
                  } else {
                    return item;
                  }
                }
              ),
            };
          });
        });
      }
    )
  };
  const [preview,setPreview]=useState(false);
  const [LinkPreview,setLinkPreview]=useState(false);
  const [previewUrl,setPreviewUrl]=useState("")
  const handleLinkPreview = (index,event) => {
    console.log(previewUrl)
  };
  function isValidLink(str){
    
    // Extract JavaSetup8u371.exe from the url
    var filename = str.substring(str.lastIndexOf('/')+1,str.indexOf('?'));
    if(fileTypes.includes(filename.slice(filename.lastIndexOf(".")))){
      setLinkPreview(true)
      return true;
    }
    
    
    else{
      setLinkPreview(false);
      return false;
    }
    
    
  }
  const handlePreview = (index,event) => {
    // console.log(file)
    if (isValidLink(previewUrl)){
      console.log(previewUrl)
      setLinkPreview(true);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=(event)=>{
      setPreviewUrl(event.target.result);
    }
    setPreview(true);
  };

  const handleAddDay = () => {
    if(days>14){
      alert("You cannot add more than 15 days");
      return;
    }
    setDays((previouVal) => previouVal + 1);
    setDaysContent((previousVal) => {
      return {
        ...previousVal,
        ["day" + (days + 1)]: [{ media: "", paragraph: "" }],
      };
      }
    );
  };

  const handleFileUpload =  () => {
    console.log(currentDay);
    console.log(daysContent);
  }
  const [Para150,setPara150]=useState(false);
  const handleAddParagraph = () => {
    setDaysContent((previousVal) => {
      return {
        ...previousVal,
        ["day" + currentDay]: [
          ...previousVal["day" + currentDay],
          { media: "", paragraph: "" },
        ],
      };
    });
  };
  const []=useState(0);
  const handleSingleDay = (day) => {
    setCurrentDay(day);
    !daysContent.hasOwnProperty("day" + day) &&
      setDaysContent((previousVal) => {
        return {
          ...previousVal,
          ["day" + day]: [{ media: "", paragraph: "" }],
        };
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //TODO: Make a POST request to the server

    const records = {
      fields: {
        CourseName: formContent.courseName,
        InstructorName: formContent.instructorName,
        Desc: formContent.desc,
        Category: formContent.category,
        Language: formContent.language,
        Days: JSON.stringify(daysContent),
        User: user.sub,
        File:user.file,
      },
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/courses/createCourse`,
        {
          method: "POST",
          body: JSON.stringify(records),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data)
      alert("Course Added Successfully");
      // console.log(data);
      history.push("/courses");
    } catch (error) {
      console.log(error);
    }
  };
  const CourseContentContainerRef = useRef(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const records = {
      fields: {
        CourseName: formContent.courseName,
        InstructorName: formContent.instructorName,
        Desc: formContent.desc,
        Category: formContent.category,
        Language: formContent.language,
        Days: JSON.stringify(daysContent),
        User: user.sub,
      },
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/courses/updateCourse`,
        {
          method: "PATCH",
          body: JSON.stringify(records),
          headers: {
            id: id,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Course Updated Successfully");
        console.log(data);
        history.push("/courses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const NoKeyCheck = (event) => {
    console.log(event.currentTarget.value.split(" ").length)
    if (event.key !== "backspace" && event.key !== "Delete" && event.currentTarget.value.split(" ").length>=150) {
      event.preventDefault();
    }
  }

  useEffect(() => {
    if (id) {
      let daysData;
      typeof courseContent?.fields?.Days === "string" &&
        (daysData = JSON.parse(courseContent?.fields?.Days));
      let count=0;
      // find length of JSON object
      for (var k in daysData) {
        if (daysData.hasOwnProperty(k)) {
          ++count;
        }
      }
      console.log(daysData["day1"][0]);
      setDays(count);
      setDaysContent(daysData);
      setFormContent({
        courseName: courseContent?.fields.CourseName,
        instructorName: courseContent?.fields.InstructorName,
        desc: courseContent?.fields.Desc,
        category: courseContent?.fields.Category,
        language: courseContent?.fields.Language,
      });

    }

  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>{id ? "Update Course" : "New Course"}</Title>
        <Form noValidate autoComplete="off">
          <TopContainer>
            <LeftContainer>
              <TextField
                label="Course Name"
                variant="outlined"
                required
                name="courseName"
                fullWidth
                margin="normal"
                onChange={handleForm}
                value={formContent.courseName ? formContent.courseName : ""}
              />
              <TextField
                label="Brief Description"
                variant="outlined"
                name="desc"
                required
                color="primary"
                fullWidth
                multiline
                rows={4}
                onChange={handleForm}
                value={formContent.desc ? formContent.desc : ""}
              />
            </LeftContainer>
            <RightContainer>
              <TextField
                label="Course Instructor Name"
                required
                name="instructorName"
                color="primary"
                fullWidth
                margin="normal"
                onChange={handleForm}
                value={
                  formContent.instructorName ? formContent.instructorName : ""
                }
              />
              <FilterContainer>
                <Filter>
                  <SingleFilterContainer>
                    <FilterText>Category</FilterText>
                    <Select name="category" onChange={handleForm} required>
                      {categoryOptions.map((option, index) => (
                        <Option
                          key={index}
                          selected={
                            id
                              ? formContent.category === option.value
                              : option.value === "Selected"
                          }
                        >
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </SingleFilterContainer>

                  <SingleFilterContainer>
                    <FilterText>Language</FilterText>
                    <Select name="language" onChange={handleForm} required>
                      {LanguageOptions.map((option, index) => (
                        <Option
                          key={index}
                          selected={
                            id
                              ? formContent.language === option.value
                              : option.value === "Selected"
                          }
                        >
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </SingleFilterContainer>
                </Filter>
              </FilterContainer>
            </RightContainer>
          </TopContainer>
          {/* make the BottomContainer in such a way that each CarouselDay has its
          own CourseContentContainer and on click of each day the
          CourseContentContainer becomes active for each CarouselDay */}

          <BottomContainer>
            <Carousel >
              <KeyboardArrowLeftSharp onClick={()=>{handleClick("prev")}}/>
              <CarouselDayContainer ref={carouselContainerRef} >
                
                {
                daysArr.map((day) => (
                  <CarouselDay
                    key={day}
                    onClick={() => handleSingleDay(day)}
                    main={{ active: currentDay === day ? "active" : "" }}
                  >
                    Day {day}
                  </CarouselDay>
                  
                ))
                }
              </CarouselDayContainer>
              <KeyboardArrowRightSharp right onClick={()=>{ handleClick("next") }}/>
              <ActionButton onClick={handleAddDay}>
                <AddCircleOutlineOutlined />
                <ActionButtonTitle >Add Day</ActionButtonTitle>
              </ActionButton>
            </Carousel>
            <CourseContentContainer ref={CourseContentContainerRef}>
              {daysContent["day" + currentDay]?.map((dayContent, index) => (
                <CourseContentWrapper key={index}>
                  <ParagraphContainer>
                    {/* Add word count for this textfield */}
                    <TextField
                      label="Paragraph"
                      variant="outlined"
                      required
                      color="primary"
                      fullWidth
                      multiline
                      rows={4}
                      value={dayContent.paragraph}
                      margin="normal"
                      name={`paragraph`}
                      onChange={(event) =>{ handleDaysData(index, event); NoKeyCheck(event); }}
                      onFocus={(event)=>{setActiveIndex(index);window.addEventListener("focus",handleFocusBack);}}

                    />
                    {
                      index===activeIndex && dayContent.paragraph.length>0?
                      <WordCount style={{display:"flex"}}>
                        <p style={{"color":dayContent.paragraph.split(" ").length>=150?"Red":"Blue"}} onChange={(event)=>{dayContent.paragraph.split(" ").length>=150?setPara150(true):setPara150(false)}}>{dayContent.paragraph.split(" ").length}</p> /150
                      </WordCount>
                        :<> </>
                    }
                  </ParagraphContainer>
                  
                  <MediaContainer>
                                        
                    <TextField
                      label="Media"
                      variant="outlined"
                      required
                      color="primary"
                      fullWidth
                      value={dayContent.media}
                      margin="normal"
                      name={`media`}
                      onChange={(event) =>{ handleDaysData(index, event); }}
                    />
                  {/* Add a div which takes files to get uploaded */}
                  <div style={{display:"flex"}}>
                      <input type="file" name="file" id="File"
                     onChange={handleChange}  style={{appearance: "none", display:"none"}}/>
                   
                    <label htmlFor="File">
                    <FolderOpenOutlined onClick={(event)=>{handleUpload(index,event)}}/>
                    </label>

                       { 
                       uploading && activeIndex===index?
                        <LoadingScreen style={{width:"100%",height:"100%"}} >
                          <div style={{display:"flex",flexDirection:"column",alignItems:"center", padding:"100px", background: "linear-gradient( 223deg, rgb(115, 216, 206) 0%, rgb(255, 211, 140) 100% )",borderRadius: "50px"}}>
                          {
                            progress === 100 ? 
                              <div>
                                <div style={{fontSize:"2.5em"}}> Uploaded </div>
                                <img src={Done} alt="" />
                              </div>
                              : 
                              <div>
                                <div style={{fontSize:"2em"}}> Uploading... </div>
                                <progress value={progress} max="100" style={{marginTop:"10px", height:"2.5em",width:"10em"}}/>
                              </div>
                          }
                          </div>
                        </LoadingScreen> 
                        :<></>
                        
                        }
                        
                      <div style={{display:"flex"}}>

                        {
                          activeIndex === index  && file.name? 
                          <div style={{display:"flex"}}> 
                            <UploadOutlined onClick={(event)=>{uploadFile(index,event)}}/> 
                            {
                              activeIndex === index && fileTypes.includes(file.name.slice(file.name.lastIndexOf(".")))? 
                              <div> <PreviewOutlined onClick={handlePreview}/> </div> 
                              : <></>
                            }
                            <div> 
                            {file.name.slice(0,9)+"..."+file.name.slice(file.name.lastIndexOf("."))} 
                            </div>
                          </div> 
                          : <></>
                        }
                          <div>
                            {
                            dayContent.media ?
                            <>
                              <PreviewOutlined onMouseOver={()=>{setPreviewUrl(dayContent.media)}} onClick={()=>{isValidLink(dayContent.media)}}></PreviewOutlined>
                            </>
                            :<></>
                            }
                            {
                              LinkPreview && previewUrl?
                              <Preview style={{display:"flex"}}>
                                {/* Put the close button to the top right of the preview container */}
                                <Close style={{position:"absolute",top:"0",right:"0",margin:"10px",cursor:"pointer"}} onClick={()=>{setLinkPreview(false)}}/>
                                <iframe src={previewUrl} frameborder="0" allowFullScreen  style={{zIndex:"10", width:"80vw", height:"80vh"}}></iframe>
                              </Preview> :<></>
                            }
                          </div>
                        {
                          preview && activeIndex === index && previewUrl?
                          <Preview style={{display:"flex"}}>
                            {/* Put the close button to the top right of the preview container */}
                            <Close style={{position:"absolute",top:"0",right:"0",margin:"10px",cursor:"pointer"}} onClick={()=>{setPreview(false)}}/>
                            <iframe src={previewUrl} frameborder="0" allowFullScreen  style={{zIndex:"10", width:"80vw", height:"80vh"}}></iframe>
                         </Preview> :<></>
                          
                        }
                      </div>

                    </div>

                  </MediaContainer>
                </CourseContentWrapper>
              ))}
              <ActionButton two onClick={handleAddParagraph}>
                <AddCircleOutlineOutlined />
                <ActionButtonTitle>Add Paragraph</ActionButtonTitle>
              </ActionButton>
            </CourseContentContainer>
          </BottomContainer>
          <ButtonContainer>
            <Link to="/courses">
              <Button title="Cancel" />
            </Link>
            {id ? (
              <Button
                func={handleUpdate}
                title="Update Course"
                type="Primary"
              />
            ) : (
              <Button func={handleSubmit} title="Add Course" type="Primary" />
            )}
          </ButtonContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.main`
  padding: 0.5rem;
  background: rgb(115, 216, 206);
  background: linear-gradient(
    223deg,
    rgba(115, 216, 206, 0.5) 0%,
    rgba(255, 211, 140, 0.3) 100%
  );
  display: flex;
  align-items: center;
  min-height: 92vh;
  max-width: 100%;
`;

const Wrapper = styled.div`
  background: white;
  width: 100%;
  margin: 0 0.6rem;
  min-height: 84vh;
  height: auto;
  border-radius: 0.6rem;
`;

const Title = styled.h3`
  font-size: 24px;
  color: #1e1e1e;
  padding: 1rem 2rem 1rem 2rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 2rem;
`;

const TopContainer = styled.div`
  display: flex;
  flex: 1;
`;

const LeftContainer = styled.div`
  flex: 1;
  margin-right: 6rem;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FilterContainer = styled.div``;
const SingleFilterContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin-top: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  /* width:200px; */
  font-size: 18px;
  font-weight: 700;
  line-height: 17px;
`;

const Select = styled.select`
  padding: 10px;
  width: 20rem;
  border: 1px solid #c4c4c4;
  border-radius: 0.4rem;
`;
const Option = styled.option`
  /* color:#C4C4C4; */
`;

const BottomContainer = styled.div``;

const Carousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* max-width:100vw; */
  svg {
    color: rgba(34, 124, 157, 1);
    background: rgba(34, 124, 157, 0.05);
    padding: 0.1rem;
    border-radius: 50%;
    margin: 0 20px;
    cursor: pointer;
  }CarouselDay
`;

const CarouselDayContainer = styled.div`
  display: flex;
  overflow: scroll;
  scroll-snap-type: x mandatory;
  width: 62%;
  border: 1px solid #c4c4c4;
  max-width: 65vw;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselDay = styled.span`
  background: ${({ main }) => (main.active ? "rgba(34, 124, 157, 0.05)" : "")};

  border-radius: 5px 5px 0px 0px;
  padding: 0.6rem;
  text-align: center;
  min-width: 6rem;
  max-width: 6rem;
  cursor: pointer;

  :not(:last-child) {
    margin-right: 10px;
  }
`;

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #227c9d;
  border-radius: 0.3rem;
  color: white;
  ${({ two }) =>
    two &&
    `
    margin-top:1rem;
    display: flex;
    width:150px;
  `}
  padding: 0.3rem 0.5rem;

  cursor: pointer;
  /* margin-bottom:10px; */
  svg {
    margin-left: 0;
    margin-right: 0.3rem;
    color: #fff;
  }
`;

const ActionButtonTitle = styled.span`
  -webkit-user-select: none; /* Safari */        
-moz-user-select: none; /* Firefox */
-ms-user-select: none; /* IE10+/Edge */
user-select: none; /* Standard */
`;
const CourseContentContainer = styled.div`
  width: 100%;
  height: 250px;
  background: rgba(34, 124, 157, 0.05);
  display: flex;
  padding: 1rem;
  flex-direction: column;
  height: 30vh;
  max-height: 30vh;
  overflow: scroll;
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CourseContentWrapper = styled.div`
  display: flex;
  flex: 1;
  height: max-content;
`;
const WordCount = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
  z-index: 100;
  color: #545353;
  font-size: 1rem;
  font-weight: 600;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;
const ParagraphContainer = styled.div`
position: relative;
  display:flex;
  flex: 1;
  margin-right: 6rem;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-right: 1rem;
 
`;
const MediaContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  svg {
    color: #545353;
    background: white;
    padding: 0.2rem;
    border-radius: 0.3rem;
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

// Loading screen for the file upload
const LoadingScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Preview = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;



export default AddCourse;
