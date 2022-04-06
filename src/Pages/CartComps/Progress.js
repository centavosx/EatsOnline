import '../../CSS/Progress.css'

const Progress = (props) => {
  return (
    <div className="cartlist">
      <h1 className="text-center">MY CART LIST</h1>
      <h6 className="h6">USERNAME: Guest</h6>

      <div className="progressbar">
        <div className="progress" id="progress" style={props.width}></div>
        <div
          className={props.progress[0]}
          data-title="CART"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            props.setWidth({ width: '0%' })
            props.setProgress([
              'progress-step progress-step-active',
              'progress-step',
              'progress-step',
              'progress-step',
            ])
          }}
        ></div>
        <div
          className={props.progress[1]}
          data-title="ORDER"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            props.setWidth({ width: '33.33%' })
            props.setProgress([
              'progress-step progress-step-active',
              'progress-step progress-step-active',
              'progress-step',
              'progress-step',
            ])
          }}
        ></div>
        <div className={props.progress[2]} data-title="CONFIRMATION"></div>
        <div className={props.progress[3]} data-title="SUMMARY"></div>

        {/* "progress-step progress-step-active" */}
      </div>
    </div>
  )
}

export default Progress
