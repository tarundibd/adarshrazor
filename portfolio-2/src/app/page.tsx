'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import ReactCompareImage from 'react-compare-image';
import { TypeAnimation } from 'react-type-animation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MaskedImage } from "@/components/ui/masked-image";

export default function Home() {
  const [show, setShow] = useState(false);
  const [alertshow, setAlertShow] = useState(true);
  const [colorChangedflag1, setColorChangedflag1] = useState(false);
  const [clicks, setClicks] = useState(0);

  const handleClick = (event:any) => {
    setClicks(clicks + 1);
    const target = event.target as HTMLElement;
    if (clicks === 6) {
      target.style.color = 'lightcoral';
      setShow(true);
      setColorChangedflag1(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertShow(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="min-h-screen mx-6 my-12">
      <CardContent className="p-6 space-y-6">

            <div className="grid md:grid-cols-2 gap-8 items-center py-7">
              <div className="flex justify-center">
              <div className="relative w-[300px] h-[300px]">
                <div className="mask-no-repeat mask-size-[100%_100%] mask-center" style={{ maskImage: 'url(/shape/mask-shape-4.svg)' }}>
                  <ReactCompareImage
                    leftImage="/avatar.svg"
                    rightImage="/avatar-g.svg"
                    sliderLineColor="#FFFFFF"
                    sliderPositionPercentage={0.85}
                  />
                </div>
              </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-5xl font-bold mb-4">Hi, Adarsh here !</h1>
                <p className="text-3xl">
                  I am a <span className="text-[#153448]">full stack developer</span> <span className="text-[#e4d4b4]">and a Hacker</span>
                </p>
              </div>
            </div>


        <Card>
          <CardContent>
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed">
                  <span className="text-3xl font-dancing-script">I</span> am a <a href="https://en.wikipedia.org/wiki/hacker" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">hacker⁽⁺⁾</a> 👋🏻. Deeply curious about technology and social-engineering, I graduated from <a href="https://www.reva.edu.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Reva University⁽⁺⁾</a> as an Engineer with a Bachelor's in computer science.
                  <br /><br />
                  I started developing websites at an early age for various startups, became a webmaster for various universities, IEEE, and IISc Bangalore events, and also wrote a research paper on <a href="http://www.testmagzine.biz/index.php/testmagzine/article/view/8343/6317" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Virtual Assistants based on User Preferences⁽⁺⁾</a>
                  <br /><br />
                  I started my <i>career</i> as a frontend developer, but the latter of my curiosities learned about cloud technologies. Currently, I am seeking job opportunities as a full-stack developer.
                  <br /><br />
                  When I am not in front of the screen, I probably go to put my life on track and be the best version. I like cafes, music, wanderlust and creative.
                  <br /><br />
                  Stay in touch! ✨
                </p>
              </div>
          </CardContent>
        </Card>

        {alertshow && (
          <div className="fixed top-5 left-0 right-0 z-50">
            <div className="max-w-md mx-auto bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
              <p className="text-center">I am just trying to follow the tread, 😊!!</p>
            </div>
          </div>
        )}

        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <span className="text-7xl font-bold text-[#153448]">8</span>
                <span className="text-xl mt-2">projects completed</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-7xl font-bold text-[#0A6847]">1500+</span>
                <span className="text-xl mt-2 text-[#0A6847]">open source commits</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-7xl font-bold text-[#153448]">5</span>
                <span className="text-[#153448]">yrs</span>
                <span className="text-xl mt-2">total experience</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-4xl">
          I perform <span className="italic font-normal">symphonies</span> with my <span className="text-blue-600">keyboard</span>,
          <br/>
          turning the world into my <span className="text-[#41B06E]">stage</span> and its people into my <span className="text-red-600">audience</span>.
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-section">
                {/* Skills component will be added here */}
                <div className="p-4 text-lg">
                  <p>Skills section placeholder - to be implemented as a separate component</p>
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-5">
                    {/* Placeholder for Avatar1 */}
                    <div className="w-full h-[350px] rounded-full bg-gray-200 animate-float" />
                  </div>
                  <div className="col-span-1 flex flex-col items-center">
                    {/* Placeholder for Avatar2 */}
                    <div className="w-full aspect-square rounded-full bg-gray-200 animate-float-delay" />
                    <div className="mt-40">
                      {/* Placeholder for a1.gif */}
                      <div className="w-12 h-12 rounded-full bg-gray-200 animate-float-quick" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h4 className="text-center mt-5">
              <hr className="my-4"/>
              I may have hidden a few digital easter eggs for the curious clicker. 
              <span className="font-bold cursor-pointer" onClick={handleClick}>Happy hunting!</span> 🎉
              <hr className="my-4"/>
            </h4>

            {colorChangedflag1 && (
              <div className="max-w-md mx-auto mt-4">
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
                  <h4 className="font-bold">Hurray! 🐣 You found an Easter egg!</h4>
                  <p>There are more hidden things for the truly observant.</p>
                  <button onClick={() => setShow(false)} className="absolute top-0 right-0 p-2">
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
