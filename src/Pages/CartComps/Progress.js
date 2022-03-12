import "../../CSS/Progress.css";

const Progress = () =>{
    return(
      <div className="cartlist">
        <h1 className="text-center">MY CART LIST</h1>
        <h6 className="h6">USERNAME: Guest</h6>
      
        <div className="progressbar">
        <div className="progress" id="progress"></div>
        <div
          className="progress-step progress-step-active"
          data-title="CART"
        ></div>
        <div className="progress-step" data-title="CHECKOUT"></div>
        <div className="progress-step" data-title="CONFIRM"></div>
      </div>
      </div>
    )
}

export default Progress;