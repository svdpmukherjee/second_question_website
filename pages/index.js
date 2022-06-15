import React from 'react';

import questions from '../questions.json';
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { browserName, isMobile } from 'react-device-detect';

export default function Home(props) {
  const { ip_address_1, ip_address_2 } = props;
  const [nextClick, setNextClick] = useState('');
  const [hintClick, setHintClick] = useState('');

  const [buttonText, setButtonText] = useState('');
  const router = useRouter();
  let deviceType = '';
  // const [buttonColor, setButtonColor] = useState('');

  // Show answer button
  const handleShowAnswer = async (event) => {
    const questionNo = event.target.id.toString();
    if (questionNo > 900) {
      setHintClick(questionNo);
      setNextClick('');
    } else {
      let date = new Date().toISOString();
      // update-database
      let response_put = await fetch('/api/databaseOperations', {
        method: 'PUT',
        body: questionNo,
      });

      isMobile ? (deviceType = 'Mobile') : (deviceType = 'Desktop');
      // read-add-database
      let passValue = {
        ip_address_1: ip_address_1,
        ip_address_2: ip_address_2,
        questionNo: questionNo,
        date: date,
        deviceType: deviceType,
        browser: browserName,
      };
      //console.log(passValue);
      let response_post = await fetch('/api/databaseOperations', {
        method: 'POST',
        body: JSON.stringify(passValue),
      });

      let data = await response_post.json();

      // if (questionNo === 999) {
      //   setNextClick(questionNo);
      //   return setButtonText(answer);
      // }
      if (data.success) {
        // console.log(data.message);
        setNextClick(questionNo);
        setHintClick('');
        return setButtonText(data.message);
      } else return data.message;
    }
    // setButtonText(response_post);

    // console.log(nextClick, buttonText);
  };

  // Expalanation button
  // const handleHint = async (event) => {
  //   const hint_question = event.target.id.toString();
  //   setHintClick(hint_question);
  // };

  // JSX
  return (
    <div className="">
      <Head>
        <title>Let's Crack CAT Together </title>
      </Head>

      <Navbar />
      <div className="text-4xl p-2 font-mono">
        Quantitative Aptitude - Solutions from 2011 paper{' '}
      </div>
      <div className=" py-8 h-full font-mono">
        <div className="grid grid-cols-9 gap-3">
          <div className=" rounded-lg col-span-7 p-3 bg-white">
            <div className="grid grid-rows-4 py-2">
              {questions.map((ques) => {
                return (
                  <div className="border-t-2">
                    <div className="row-span-2 m-4">
                      <>
                        <p className="text-md" key={ques.question}>
                          <span className="font-semibold">
                            Question {ques.number}.{' '}
                          </span>
                          {ques.question}
                        </p>
                      </>
                    </div>

                    <div className="row-span-2 flex">
                      <div className="grid grid-cols-7">
                        {(() => {
                          if (ques.id != nextClick) {
                            return (
                              <button
                                className="w-30 m-1 p-2 hover:bg-blue-700 hover:text-white  col-span-2 ml-6"
                                id={ques.id}
                                key={ques.number}
                                onClick={(e) => handleShowAnswer(e)}
                              >
                                Want to see how it is solved?
                              </button>
                            );
                          } else {
                            return (
                              <button
                                className="w-30 m-1 p-2 hover:bg-blue-700 hover:text-white  col-span-2 ml-6"
                                id={ques.id}
                                key={ques.number}
                                disabled={true}
                                onClick={(e) => handleShowAnswer(e)}
                              >
                                Want to see how it is solved?
                              </button>
                            );
                          }
                        })()}
                        {(() => {
                          if (ques.id == nextClick) {
                            return (
                              <>
                                <div className="m-auto col-span-2">
                                  Correct answer is:
                                  <p className="bg-yellow-400 text-center">
                                    {buttonText}
                                  </p>
                                </div>
                                <div className="col-span-3 flex justify-center">
                                  <div className="absolute font-serif blur-sm text-sm  z-0  ">
                                    Lorem ipsum dolor adipiscing elit. <br />
                                    Aenean gravida, turpis <br />
                                    id dapibus auctor, <br />
                                    tortor enim suscipit ipsum, eget <br />
                                  </div>
                                  <button className=" z-20 text-2xl font-bold  bg-gradient-200 p-3 rounded-lg">
                                    <a href="https://www.careerlauncher.com/cl-online/product-group.jsp?prodCat">
                                      Click to enroll in CAT 2022 batch!
                                    </a>
                                  </button>
                                </div>
                              </>
                            );
                          } else if (ques.id == hintClick) {
                            return (
                              <>
                                <div className="m-auto col-span-2">
                                  Correct answer is:
                                  <p className="bg-yellow-400 text-center">
                                    {ques.answer}
                                  </p>
                                </div>
                                <div className="col-span-3 flex justify-center">
                                  <div className="absolute font-serif blur-sm text-sm  z-0  ">
                                    Lorem ipsum dolor adipiscing elit. <br />
                                    Aenean gravida, turpis <br />
                                    id dapibus auctor, <br />
                                    tortor enim suscipit ipsum, eget <br />
                                  </div>
                                  <button className=" z-20 text-2xl font-bold  bg-gradient-200 p-3 rounded-lg">
                                    <a href="https://www.careerlauncher.com/cl-online/product-group.jsp?prodCat">
                                      Click to enroll in CAT 2022 batch!
                                    </a>
                                  </button>
                                </div>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <p className="m-auto"></p>
                              </>
                            );
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-2 col-span-2 flex justify-center">
            <div>
              {/* <Iframe
                url="https://www.youtube.com/embed/Smn-MSDCAuo"
                // width="450px"
                // height="450px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
              /> */}
              <img src="testi_2.png" className="shadow-xl animate-pulse" />{' '}
              <br />
              <img src="testi_1.png" className="shadow-xl animate-pulse" />{' '}
            </div>
          </div>
        </div>
      </div>
      <div className="text-2xl">
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  // console.log(req.headers);
  const ip_1 = req.headers['x-real-ip'] || req.connection.remoteAddress;
  const ip_2 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // console.log(JSON.stringify(ip));
  // console.log(ip);

  // const res = await axios.get('https://geolocation-db.com/json');
  // const ip = res.data.IPv4;
  const ip_segments_1 = ip_1.split('.');
  const ip_segments_2 = ip_2.split('.');
  let ip_segments_int_1 = ip_segments_1.map((item) => parseInt(item, 10));
  let ip_segments_int_2 = ip_segments_2.map((item) => parseInt(item, 10));

  // transforming IP addresses
  ip_segments_int_1[0] = ip_segments_int_1[0] * Math.pow(2, 2) + 5 * 5;
  ip_segments_int_1[1] = ip_segments_int_1[1] * Math.pow(3, 3) + 4 * 4;
  ip_segments_int_1[2] = ip_segments_int_1[2] * Math.pow(4, 4) + 3 * 3;
  ip_segments_int_1[3] = ip_segments_int_1[3] * Math.pow(5, 5) + 2 * 2;
  const ip_address_1 = ip_segments_int_1.join('.').toString();

  ip_segments_int_2[0] = ip_segments_int_2[0] * Math.pow(2, 2) + 5 * 5;
  ip_segments_int_2[1] = ip_segments_int_2[1] * Math.pow(3, 3) + 4 * 4;
  ip_segments_int_2[2] = ip_segments_int_2[2] * Math.pow(4, 4) + 3 * 3;
  ip_segments_int_2[3] = ip_segments_int_2[3] * Math.pow(5, 5) + 2 * 2;
  const ip_address_2 = ip_segments_int_2.join('.').toString();

  return {
    props: {
      ip_address_1,
      ip_address_2,
    }, // will be passed to the page component as props
  };
}
