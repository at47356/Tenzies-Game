export default function die(){
    return (
        <div className="dice--container">
            <div className="die" style={{ gridArea: 1 / 1 / 3 / 6 }}><p>1</p></div>
            <div className="die" style={{ gridArea: 1 / 2 / 2 / 3 }}><p>1</p></div>
            <div className="die" style={{ gridArea: 1 / 3 / 2 / 4 }}><p>1</p></div>
            <div className="die" style={{ gridArea: 1 / 4 / 2 / 5 }}><p>1</p></div>
            <div className="die" style={{ gridArea: 1 / 5 / 2 / 6 }}><p>1</p></div>
            <div className="die" style={{ gridArea: 2 / 1 / 3 / 2 }}><p>1</p></div>
            <div className="die" style={{ gridArea: 2 / 2 / 3 / 3 }}><p>1</p></div>
            <div className="die" style={{ gridArea: 2 / 3 / 3 / 4 }}><p>1</p></div>
            <div className="die" style={{ gridArea: 2 / 4 / 3 / 5 }}><p>1</p></div>
            <div className="die" style={{ gridArea: 2 / 5 / 3 / 5 }}><p>1</p></div>
        </div>
    )
}