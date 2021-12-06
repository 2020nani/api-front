import React, { useState } from 'react';
import Header from '../../components/Header';
import Produtos from '../../components/Produtos'
import CadastrarProduto from '../../components/CadastrarProduto'
import Sugestoes from '../../components/Sugestoes';
export default function Home() {

  const [route, setRoute] = useState("home");

  return (

    <div>
      <Header route={route} setRoute={setRoute}/>
      {route === "home" ? <Produtos/> :
       route === "cadastro" ? <CadastrarProduto setRoute={setRoute} /> :
       route === "sugestoes" ? <Sugestoes setRoute={setRoute} /> :
       <div></div> }
      
    </div>
  );

}
