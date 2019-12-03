import React from 'react';

export default class Resultado extends React.Component {
    render(){
        return (
            <section className="results">
                <div className="tempo">
                    <h1>Tempo</h1>
                    <h2><span id="segundos">{this.props.segundos}</span></h2>
                </div>
                <div className="ponto">
                    <h1>Pontos</h1>
                    <h2><span id="pontos">{this.props.pontos}</span>/6</h2>
                </div>
                <div className="resultados">
                    <h1>Recordes</h1>
                    {this.props.recorde.map(ponto => (
                        <h2>{ponto.points} s</h2>
                    ))}
                </div>
            </section>
        );
    }
}
