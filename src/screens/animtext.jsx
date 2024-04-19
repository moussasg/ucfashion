import { Cursor, Typewriter } from "react-simple-typewriter"
 const words = ["Fashion Models"]    
    export default function Trpc() {
      return (
        <div>
<Typewriter typeSpeed={40} loop={2} words={words} />
<Cursor cursorColor="#ffc107"/>
        </div>
      )
    }
    