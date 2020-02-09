import React from 'react';
import './settings.css';

import axios from 'axios';


class settings extends React.Component{
    save = () => {
        let drags = document.querySelectorAll('.drag-me');
        let array = Array.from(drags);
        for(let i=0;i<array.length;i++){
            array[i].style.visibility = 'hidden';
        }
        let finalString = "";
        let Sales = document.querySelector('.Sales');
        let Bill = document.querySelector('.Bill-design');
        let div = document.createElement('div');
        div.style.display = "flex";
        let div1 = document.createElement('div');
        // div1.classList.add('width1');
        div1.style.width = '70%';
        div1.style.position='relative';
        let div2 = document.createElement('div');
        // div2.classList.add('width2');
        div2.style.width = '30%';
        div2.style.position='relative';
        div1.innerHTML=Sales.innerHTML;
        div2.innerHTML = Bill.innerHTML;
        div.appendChild(div1);
        div.appendChild(div2);
        
        finalString = `<div style="display:flex">${div.innerHTML}</div>`;
        // <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
        // <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script><script>
        // let area = document.querySelector('.area');
        // area.style.display = "flex";
        // area.style.flexDirection = "column";
        // let elems = document.querySelectorAll('.elem-dimension');
        // let array = Array.from(elems);
        // for(i=0;i<elems.length;i++){
        //     array[i].addEventListener('click',function(event){
        //         let item = event.target.innerText;
        //         let temp = area.innerText;
        //         let node = document.createElement('div');
        //         node.style.width = '100%';
        //         node.style.display = 'flex';
        //         let innerNode = document.createElement('div');
        //         innerNode.style.width = '75%';
        //         innerNode.style.borderRightColor = "black";
        //         innerNode.style.borderRightWidth = "1px"
        //         innerNode.style.borderRightStyle = "solid";
        //         let qty = document.createElement('div');
        //         qty.innerText = '1';
        //         qty.style.width = '25%';
        //         qty.style.borderStyle = 'none';
        //         qty.contentEditable = "true";
        //         let textNode = document.createTextNode(item);
        //         innerNode.appendChild(textNode);
        //         node.append(innerNode)
        //         node.append(qty);
        //         area.appendChild(node);
        //     })
        // }
        // let invoice = document.querySelector('.invoice');
        // invoice.addEventListener('click', function(){
        //     html2canvas(area,{
        //         onrendered:function(canvas){
        //             var imgData = canvas.toDataURL('image/png');
        //             var doc = new jsPDF('p', 'mm');
        //             doc.addImage(imgData, 'PNG', 20, 20);
        //             doc.save('sample.pdf');
        //         }
        //     })
        // })
        // </script>`;
        axios.post('http://192.168.43.52:4000/user/design', {finalString:finalString});
    }
    render(){
        return(
        <div className="billPane">
            <div class="accordion employee-field" id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button class="btn" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                    View employees
                  </button>
                </h2>
              </div>
          
              <div id="collapseThree" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                <div className="view-access-holders hidden">
                    <div className="employee">
                        <h6>Arun</h6>
                        <button className="btn btn-danger btn-sm">delete</button>
                        <button className="btn btn-success btn-sm ">view privileges</button>
                    </div>
                    <div className="employee">
                        <h6>Ayush</h6>
                        <button className="btn btn-danger btn-sm">delete</button>
                        <button className="btn btn-success btn-sm ">view privileges</button>
                    </div>
                    <div className="employee">
                        <h6>Sarthak</h6>
                        <button className="btn btn-danger btn-sm">delete</button>
                        <button className="btn btn-success btn-sm ">view privileges</button>
                    </div>
                </div>   
                </div>
              </div>
            </div>
        </div>


        
        <div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn" type="button" data-toggle="collapse" data-target="#collapsefour" aria-expanded="true" aria-controls="collapsefour">
          Inventory
        </button>
      </h2>
    </div>

    <div id="collapsefour" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
            <div className="inventory">
                 <button className="btn btn-outline-success btn-sm btn-adjust-inventory">Stock</button>
                 <button className="btn btn-outline-danger btn-sm btn-adjust-inventory">Purchase</button>
            </div>
      </div>
    </div>
  </div>
</div>






<div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn" type="button" data-toggle="collapse" data-target="#collapsefive" aria-expanded="true" aria-controls="collapsefive">
          View Past logs
        </button>
      </h2>
    </div>
  </div>
</div>



<div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn" type="button" data-toggle="collapse" data-target="#collapsesix" aria-expanded="true" aria-controls="collapsesix">
          Update Keys
        </button>
      </h2>
    </div>

    <div id="collapsesix" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
            <div className="inventory">
                 <button className="btn btn-outline-success btn-sm btn-adjust-inventory">Change Admin keys</button>
                 <button className="btn btn-outline-success btn-sm btn-adjust-inventory">Change employee keys</button>
            </div>
      </div>
    </div>
  </div>
</div>


<div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn" type="button" data-toggle="collapse" data-target="#collpaseseven" aria-expanded="true" aria-controls="collpaseseven">
          Analytics
        </button>
      </h2>
    </div>
  </div>
</div>

<div class="accordion employee-field" id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button class="btn" type="button" data-toggle="collapse" data-target="#collapseeight" aria-expanded="true" aria-controls="collapseeight">
                    Switch Company
                  </button>
                </h2>
              </div>
          
              <div id="collapseeight" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                <div className="view-access-holders hidden">
                    <div className="employee">
                        <h6>Company name</h6>
                        <button className="btn btn-success btn-sm btn-sm-adjust">Login</button>
                    </div>
                </div>   
                </div>
              </div>
            </div>
        </div>








<div className="adjust-save-design">
        <button className="btn btn-outline-primary adjust-save-button" onClick={this.save}>
            Save Designs
        </button>
</div>






        </div>
        )
    }
}

export default settings;