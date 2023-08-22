import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import twitter from "../assets/square-twitter.svg";
import linkedin from "../assets/linkedin.svg"
import facebook from "../assets/facebook.svg"
import github from "../assets/github.svg"

export default function Footer() {
    return (
        <footer className='bg-gradient-to-tr from-hue-main to-hue-other-2 mt-auto py-2'>
            <ul className='flex md:gap-8 gap-6 justify-center pt-6 pb-8'>
                <li className='hover:opacity-50'><a href=""><img className='md:w-10 w-8' src={twitter} alt="" /></a></li> 
                <li className='border-r md:h-8 h-6 my-auto border-slate-950'></li>
                <li className='hover:opacity-50'><a href=""><img className='md:w-10 w-8' src={linkedin} alt="" /></a></li> 
                <li className='border-r md:h-8 h-6 my-auto border-slate-950'></li>
                <li className='hover:opacity-50'><a href=""><img className='md:w-10 w-8' src={facebook} alt="" /></a></li> 
                <li className='border-r md:h-8 h-6 my-auto border-slate-950'></li>
                <li className='hover:opacity-50'><a href=""><img className='md:w-10 w-8' src={github} alt="" /></a></li> 
            </ul>
      <ul className="flex mx-auto w-fit md:px-14 px-8 rounded-lg bg-opacity-25 bg-gray-500 md:py-3 py-2 md:text-xl text-md gap-4  justify-center">
          <li className=" hover:text-gray-500 text-slate-50">
            <a href="#">Home</a>
          </li>
          <li className=" hover:text-gray-500 text-slate-50">
            <a href="#">Blog</a>
          </li>
          <li className=" hover:text-gray-500 text-slate-50">
            <a href="#">About</a>
          </li>
          <li className=" hover:text-gray-500 text-slate-50">
            <a href="#">Contact me</a>
          </li>
      </ul>
      <h1 className='text-center pt-8 md:text-xl text-sm text-slate-600 pb-6'>©2022 MB al-J & tech. all rights reserved. Hosted by Heroku</h1>
        </footer>
    )
}