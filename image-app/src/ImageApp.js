
const ImageApp = (props) =>{
    const imageUrl = props.images;   
    return(<img  src={imageUrl} alt="logo" width="200px" height="200px"/>   )
}
export default ImageApp;