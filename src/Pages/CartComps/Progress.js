import '../../CSS/Progress.css'

const Progress = (props) => {
  return (
    <div className="cartlist">
      <div className="cart-title">
        <h1 className="text-center">MY CART LIST</h1>
        <h6 className="h6">USERNAME: Guest</h6>
      </div>

      <div className="progressbar">
        <div className="progress" id="progress" style={props.width}></div>
        <div className={props.progress[0]} data-title="CART"></div>
        <div className={props.progress[1]} data-title="ORDER"></div>
        <div className={props.progress[2]} data-title="CONFIRMATION"></div>
        <div className={props.progress[3]} data-title="SUMMARY"></div>

        {/* "progress-step progress-step-active" */}
      </div>
    </div>
  )
}

export default Progress
