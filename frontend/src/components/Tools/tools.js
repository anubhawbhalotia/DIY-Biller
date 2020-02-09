import React from 'react';
import './tools.css';

class item extends React.Component{
    
    handleClick = (event) => {
        let search = document.querySelector('.active').innerText;
        let workspace = document.querySelector(`.${search}`);
        let div = document.createElement('div')
        let elem = document.createElement('div');
        elem.classList.add('drag-me');
        let btn = document.createTextNode('drag');
        elem.appendChild(btn);
        div.appendChild(elem);
        div.onmousedown = function(event){
            let shiftX =  event.clientX - div.getBoundingClientRect().left/2;
            let shiftY =  event.clientY - div.getBoundingClientRect().top/2;
            div.style.position = 'absolute';
            div.style.zIndex =  1000;
            function move(pageX, pageY){
                div.style.left = pageX - shiftX + 'px';
                div.style.top = pageY - shiftY + 'px';
            }
            
            function onMouseMove(event) {
                move(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);
            
            
            document.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                document.onmouseup = null;
                shiftX = div.style.left;
                shiftY = div.style.top;
            };  
        }
        div.ondragstart = function(){
            return false;
        }
        div.classList.add('drag')
        if(event.target.name === 'div'){
            let area = document.createElement('div');
            area.classList.add('area');
            div.style.width = '75%';
            area.style.width = '100%';
            area.style.height = '50vh';
            area.innerHTML = `Items`;
            area.style.display = 'flex';
            area.style.flexDirection = 'column';
            area.style.backgroundColor = 'rgb(255, 254, 221)';
            div.appendChild(area);
            workspace.appendChild(div);
            return;
        }


        if(event.target.name === 'textarea'){
            let textarea = document.createElement('textarea');
            textarea.placeholder = 'Custom information';
            div.appendChild(textarea);
            workspace.appendChild(div);
            return;
        }


        if(event.target.name === 'select' && event.target.value === 'Time Drop'){
            let select = document.createElement('select');
            select.innerHTML = ` <option value="time 1">1 month</option>
            <option value="time 2">3 months</option>
            <option value="time 3">6 months</option>`;
            div.appendChild(select);
            workspace.appendChild(div);
            return;
        }

        if(event.target.name === 'select'){
            let select = document.createElement('select');
            select.innerHTML = ` <option value="Male">Male</option>
            <option value="female">Female</option>
            <option value="other">Others</option>`;
            div.appendChild(select);
            workspace.appendChild(div);
            return;
        }

        if(event.target.name === 'label'){
            let label = document.createElement('label');
            label.innerHTML = `Edit me`;
            label.contentEditable = 'true';
            div.appendChild(label);
            workspace.appendChild(div);
            return;
        }

        if(event.target.name === 'heading'){
            let heading = document.createElement('h2');
            heading.innerHTML = `Edit me`;
            heading.contentEditable = 'true';
            div.appendChild(heading);
            workspace.appendChild(div);
            return;
        }
    
        let input = document.createElement('input');
        input.type=event.target.name;
        if(input.type === 'text')
            input.placeholder = event.target.value;
        else 
            input.value = event.target.value;
        if(event.target.value === 'Invoice'){
            input.classList.add('invoice');
        }
        div.appendChild(input);
        workspace.appendChild(div);
    }
    render(){
        return(
        <div>

            <div className="accordion" id="accordionExample">
                    <div className="card">
                    <div className="card-header" id="headingOne">
                    <h4 className="mb-0">
                        <button className="btn btn-length" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Sales
                        </button>
                    </h4>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="card-body sales-body">
                        <div className="sales-left">
                            
                            <input className="btn btn-info" type="button" value="Name" name="text" onClick={this.handleClick}></input>
                            <input className="btn btn-info" type="button" value="Search" name="text" onClick={this.handleClick}></input>
                            <input className="btn btn-info" type="button" value="custom" name="text" onClick={this.handleClick}></input>
                            <input className="btn btn-info" type="button" value="Dropdown" name="select" onClick={this.handleClick}></input>
                            <input className="btn btn-info" type="button" value="Heading" name="heading" onClick={this.handleClick}></input>
                            
                        </div>         

                        <div className="sales-left">
                            
                            <input className="btn btn-info" type="button" value="Address" name="text" onClick={this.handleClick}></input>
                            <input className="btn btn-info" type="button" value="Print" name="Button" onClick={this.handleClick}></input>
                            <input className="btn btn-info" type="button" value="paragraph" name="textarea" onClick={this.handleClick}></input>
                            <input className="btn btn-info" type="button" value="Feedback" name="Button" onClick={this.handleClick}></input>
                            <input  className="btn btn-info" type="button" value="label" name="label" onClick={this.handleClick}></input>
                            
                        </div>                   
                    </div>
                    </div>
                </div>
            </div>



            <div className="accordion" id="accordionExample">
                    <div className="card">
                    <div className="card-header" id="headingOne">
                    <h4 className="mb-0">
                        <button className="btn btn-length design" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick={this.handlePurchase} value="Design Purchase">Design Purchase
                        </button>
                    </h4>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    {/* <div className="card-body sales-body">
                        <div className="sales-left">
                            
                            <input type="button" value="Button" onClick={this.handleClick}></input>
                            <input type="button" value="checkbox" onClick={this.handleClick}></input>
                            <input type="button" value="text" onClick={this.handleClick}></input>
                            <input type="button" value="radioSelect" onClick={this.handleClick}></input>
                            
                        </div>                        
                    </div> */}
                    </div>
                </div>
            </div>











            <div className="accordion" id="accordionExample">
                    <div className="card">
                    <div className="card-header" id="headingOne">
                    <h4 className="mb-0">
                        <button className="btn btn-length" type="button" data-toggle="collapse" data-target="#collpasenine" aria-expanded="true" aria-controls="collpasenine">
                        Bill Design
                        </button>
                    </h4>
                    </div>

                    <div id="collpasenine" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="card-body sales-body">
                        <div className="sales-left"> 
                            <input className="btn btn-info" type="button" value="Invoice" name="button" onClick={this.handleClick}></input>
                            <input className="btn btn-info" type="button" value="Email" name="email" onClick={this.handleClick}></input>                            
                            <input className="btn btn-info" type="button" value="Time Drop" name="select" onClick={this.handleClick}></input>   
                        </div>         

                        <div className="sales-left">
                        <input className="btn btn-info" type="button" value="Signature" name="button" onClick={this.handleClick}></input>
                        <input className="btn btn-info" type="button" value="Stamp" name="label" onClick={this.handleClick}></input>
                        <input className="btn btn-info" type="button" value="Billing Area" name="div" onClick={this.handleClick}></input>
                        </div>                   
                    </div>
                    </div>
                </div>
            </div>


            </div>





            
        )
    }
}

export default item;