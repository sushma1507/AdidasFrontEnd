import './App.css';
import ImageApp from './ImageApp';
import {Images} from './images';
import {useEffect,useState} from 'react';
function App() {
  const [images,setImages] = useState(Images);
  useEffect(()=>{
    if(images.length>0) {
      setImages(images);
    } 
  });
  return (
    <div className="App">
     <h1>React Image Viewer Example</h1>
     <ImageApp images={images[0].imageUrl}/>
    </div>
  );
}

export default App;
