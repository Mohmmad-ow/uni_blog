import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import twitter from "../assets/square-twitter.svg";
import linkedin from "../assets/linkedin.svg"
import facebook from "../assets/facebook.svg"
import github from "../assets/github.svg"

export default function Footer() {
    return (
        <footer className='bg-gradient-to-tr from-hue-main to-hue-other-2 mt-auto py-6'>
            <ul className='flex gap-8 justify-center pt-6 pb-12'>
                <li className='hover:opacity-50'><a href=""><img className='w-10' src={twitter} alt="" /></a></li> 
                <li className='border-r h-8 my-auto border-slate-950'></li>
                <li className='hover:opacity-50'><a href=""><img className='w-10' src={linkedin} alt="" /></a></li> 
                <li className='border-r h-8 my-auto border-slate-950'></li>
                <li className='hover:opacity-50'><a href=""><img className='w-10' src={facebook} alt="" /></a></li> 
                <li className='border-r h-8 my-auto border-slate-950'></li>
                <li className='hover:opacity-50'><a href=""><img className='w-10' src={github} alt="" /></a></li> 
            </ul>
      <ul className="flex mx-auto w-[40%] rounded-lg bg-opacity-25 bg-gray-500 py-3 text-xl gap-4  justify-center">
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
      <h1 className='text-center pt-12 text-slate-600 pb-6'>©2022 MB al-J & tech. all rights reserved. Hosted by Heroku</h1>
        </footer>
    )
}