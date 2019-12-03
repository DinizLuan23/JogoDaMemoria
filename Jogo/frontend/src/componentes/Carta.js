import React from 'react';

export default class Carta extends React.Component{

    render(){
        const imgjs = require('../img/js-badge.svg');
        const img = require(`../img/${this.props.img}`);
        const flip = (this.props.flip) ? "flip" : null;
        return (
            <div className={`memory-card ${flip}`} style={{order: this.props.ordem}} onClick={()=>this.props.clickCarta(this.props)}>
                <img className="front-face" src={img} alt={this.props.nome} />
                <img className="back-face" src={imgjs} alt="JS badge" />
            </div>
          );
    }
  
}
