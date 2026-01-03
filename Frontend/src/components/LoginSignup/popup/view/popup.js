import '../popup.css'
export default function Popup(props){
    return(
        <div className="popup-container">
            <h2>DeliDash</h2>
            <p>{props.message}</p>
        </div>
    )
}