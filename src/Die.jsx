import './Die.css'
import Dot from './Dot'

const Die = (props) => {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFF"
    }

    let dotEL = []

    for(let i = 0; i < props.value ; i++){
        dotEL.push(<Dot key={i} />)
    }

    const dieFace = `die face${props.value}`


    return (
        <div className='die' style={styles} onClick={props.holdDice}>
            <div className={dieFace}>
                {dotEL}
            </div>
        </div>
    )
}

export default Die