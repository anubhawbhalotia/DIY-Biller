import React from 'react';
import './inventory.css';



class Inventory extends React.Component{
    submitItem = (event) => {
        event.preventDefault();
        let name = document.querySelector('.item-name').value;
        let  item_viewer = document.querySelector('.item_viewer');
        let elem = document.createElement('div');
        elem.addEventListener('click', function(event){
            let Sales = document.querySelector('.Sales');
            Sales.appendChild(elem);
            elem.classList.add('adjust-width-elem');
            elem.onmousedown = function(){
                let shiftX =  event.clientX - elem.getBoundingClientRect().left;
            let shiftY =  event.clientY - elem.getBoundingClientRect().top;
            elem.style.position = 'absolute';
            elem.style.zIndex =  1000;
            function move(pageX, pageY){
                elem.style.left = pageX + shiftX + 'px';
                elem.style.top = pageY + shiftY + 'px';
            } 
            function onMouseMove(event) {
                move(event.pageX, event.pageY);
            }
            document.addEventListener('mousemove', onMouseMove);
            
            
            document.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                document.onmouseup = null;
            };  
            }
        })
        let content = document.createTextNode(name);
        elem.classList.add('elem-dimension');
        elem.appendChild(content);
        let del = document.createElement('button');
        del.classList.add('adjust-del-btn');
        elem.appendChild(del);
        del.addEventListener('click', function(event){
            item_viewer.removeChild(event.target.parentNode);
        })
        item_viewer.appendChild(elem);
        this.handleClick();
    }

    handleClick = () => {
        let hidden = document.querySelector('.hide-initially');
        hidden.classList.toggle('visibility');
    }

    render(){
        return(
            <div className="InventoryContainer">
                <div className="btn-adjust"><button className="btn btn-outline-success btn-sm" onClick={this.handleClick}>Add new item</button></div>
                <div className="item_viewer container">

                </div>
                <form className="hide-initially form-design">
                    <div className="form-elements">
                        <input type="text" placeholder="Item Name" className="item-name"/>
                        <input type="text" placeholder="Tax Rate" className="item-rate"/>
                        <input type="text" placeholder="qty" className="item-qty"/>
                        <input type="text" placeholder="price" className="item-price" required/>
                        <button className="submit-adjust"onClick={this.submitItem}> OK </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Inventory;