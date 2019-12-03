import React from 'react';
import './App.css';
import Carta from './componentes/Carta';
import Dados from './dados';
import Resultado from './componentes/Resultado';
import api from './services/api';

var cronometro = '';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      cartasclicadas:[null,null],
      dados: null,
      pontos:0,
      segundos:0,
      pontoFinal: [],
    }
  }

  async componentDidMount(){

    const response = await api.get('ponto');

    this.setState({pontoFinal: response.data});

    let resultado = Dados.map((item)=>{
      
        item.ordem = Math.floor(Math.random() * 12);
        return item

    })
    this.setState({dados: resultado})
    cronometro = setInterval(this.fazerTempo, 1000);
  }

  fazerTempo = () => {

        let segundos = this.state.segundos;
        segundos++;
        let secs = segundos;

        this.setState({segundos:secs});
  }

  clickCarta = (props) => {
      if(props.flip) return;
      this.flipar(props.id);
      this.salvarClick(props);
  }

  salvarClick = (props)=>{
    console.log(props);
    const cartas = this.state.cartasclicadas;
    if(!cartas[0]){
      cartas[0] = props;
      this.setState({cartasclicadas:cartas})
      return;
    }

    if(cartas[0].id === props.id){
      return;
    }


      if(cartas[0].nome === props.nome){
        const pontos = this.state.pontos + 1;
        console.log("Cartas Iguais");
        cartas[0] = null;
        this.setState({pontos, cartasclicadas: cartas});
      }else{
        console.log("Cartas Diferentes");
        setTimeout(() => {
          
          cartas[0] && this.flipar(cartas[0].id);
          this.flipar(props.id);
          cartas[0] = null;
          this.setState({cartasclicadas: cartas});
      }, 1000);
        
      }
      this.setState({cartasclicadas:cartas})
  }

  pararTempo = async () =>{
    if(this.state.pontos === 6){
      clearInterval(cronometro)
      setTimeout(() =>{alert('Você completou o jogo!')}, 500);
      await api.post('ponto',{
        points : this.state.segundos
      })
    }
  }

  flipar = (id) =>{
    
    const dados = this.state.dados;
    
    const dadosAtualizados = dados.map((item)=>{
      if(item.id === id){
        item.flip = !item.flip;
      }
      return item;
    });
    this.setState({dados:dadosAtualizados});
  }

  render(){
    this.pararTempo();
    return (
      <article className="page">
      <section className="memory-game">
        {
          this.state.dados && this.state.dados.map((cartas)=>{ 
            return <Carta key={cartas.id} nome={cartas.nome} img={cartas.img} ordem={cartas.ordem} clickCarta={this.clickCarta} flip={cartas.flip} id={cartas.id} />
          })
        }
        {/* {JSON.stringify(this.state.pontoFinal.map((item) =>{
          return item.points;
        }))} */}
      </section>
      <Resultado segundos={this.state.segundos} pontos={this.state.pontos} recorde={this.state.pontoFinal}  />
      </article>
    );
  }
}

export default App;
