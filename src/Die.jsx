export default function die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#ffffff"
    }

    return (
            <div className="die"
                style={styles}
                onClick={props.hold}
            ><p>{props.value}</p></div>    
    )
}