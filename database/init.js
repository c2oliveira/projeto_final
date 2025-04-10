const artesanato = require('./artesanato');
const frutas = require('./frutas');
const kg = require('./kg');
const racoes = require('./racoes');
const sementes = require('./sementes');
const vegetais = require('./vegetais');
const precos = require('./precos');

// Função auxiliar para inserir itens com delay (para evitar problemas de concorrrência)
const inserirItens = (moduleRef, itens) => {
  itens.forEach(item => {
    moduleRef.addItem(item.nome, item.descricao, item.preco, (err, id) => {
      if (err) {
        console.error(`Erro ao inserir ${item.nome}:`, err);
      } else {
        console.log(`${item.nome} inserido com ID: ${id}`);
      }
    });
  });
};

const inserirPrecos = (itens) => {
  itens.forEach(item => {
    precos.addPrice(item.item, item.valor, (err, id) => {
      if (err) {
        console.error(`Erro ao inserir preço para ${item.item}:`, err);
      } else {
        console.log(`Preço para ${item.item} inserido com ID: ${id}`);
      }
    });
  });
};

// Dados de exemplo para cada categoria
const dadosArtesanato = [
  { nome: "Vaso de Barro", descricao: "Vaso decorativo feito à mão.", preco: 29.90 },
  { nome: "Cesto Trançado", descricao: "Cesto artesanal para decoração.", preco: 45.50 },
  { nome: "Escultura em Madeira", descricao: "Pequena escultura artesanal.", preco: 60.00 },
  { nome: "Pano Bordado", descricao: "Pano artesanal com bordados.", preco: 25.00 },
  { nome: "Luminária Rústica", descricao: "Luminária feita com materiais rústicos.", preco: 75.00 }
];

const dadosFrutas = [
  { nome: "Maçã", descricao: "Maçã fresca, qualidade premium.", preco: 3.50 },
  { nome: "Banana", descricao: "Banana orgânica.", preco: 2.20 },
  { nome: "Laranja", descricao: "Laranja suculenta.", preco: 4.00 },
  { nome: "Manga", descricao: "Manga doce e madura.", preco: 5.50 },
  { nome: "Abacaxi", descricao: "Abacaxi tropical.", preco: 6.00 }
];

const dadosKg = [
  { nome: "Arroz Integral", descricao: "Pacote de 1 kg.", preco: 8.50 },
  { nome: "Feijão Carioca", descricao: "Feijão de alta qualidade.", preco: 10.00 },
  { nome: "Açúcar Mascavo", descricao: "1 kg de açúcar mascavo.", preco: 7.80 },
  { nome: "Sal Rosa", descricao: "Sal marinho 1 kg.", preco: 12.00 },
  { nome: "Farinha de Trigo", descricao: "Farinha para diversas receitas.", preco: 4.90 }
];

const dadosRacoes = [
  { nome: "Ração para Cães", descricao: "Ração premium para cães.", preco: 50.00 },
  { nome: "Ração para Gatos", descricao: "Ração completa para gatos.", preco: 45.00 },
  { nome: "Ração para Pássaros", descricao: "Mistura especial para aves.", preco: 20.00 },
  { nome: "Ração para Coelhos", descricao: "Ração equilibrada para coelhos.", preco: 25.00 },
  { nome: "Ração para Peixes", descricao: "Ração para peixes ornamentais.", preco: 15.00 }
];

const dadosSementes = [
  { nome: "Semente de Tomate", descricao: "Sementes orgânicas.", preco: 2.50 },
  { nome: "Semente de Alface", descricao: "Alta taxa de germinação.", preco: 1.80 },
  { nome: "Semente de Cenoura", descricao: "Sementes para cultivo.", preco: 2.00 },
  { nome: "Semente de Abobrinha", descricao: "Para produção caseira.", preco: 3.20 },
  { nome: "Semente de Pimentão", descricao: "Diferentes cores disponíveis.", preco: 2.80 }
];

const dadosVegetais = [
  { nome: "Cenoura", descricao: "Vegetal fresco e crocante.", preco: 4.50 },
  { nome: "Alface", descricao: "Folhas verdes e nutritivas.", preco: 3.00 },
  { nome: "Tomate", descricao: "Tomate natural, sem conservantes.", preco: 5.00 },
  { nome: "Pepino", descricao: "Pepino para saladas.", preco: 3.50 },
  { nome: "Beterraba", descricao: "Beterraba orgânica.", preco: 4.80 }
];

const dadosPrecos = [
  { item: "Vaso de Barro", valor: 29.90 },
  { item: "Maçã", valor: 3.50 },
  { item: "Arroz Integral", valor: 8.50 },
  { item: "Ração para Cães", valor: 50.00 },
  { item: "Semente de Tomate", valor: 2.50 },
  { item: "Cenoura", valor: 4.50 }
];

console.log("Inserindo dados em artesanato...");
inserirItens(dadosArtesanato, dadosArtesanato);
console.log("Inserindo dados em frutas...");
inserirItens(frutas, dadosFrutas);
console.log("Inserindo dados em kg...");
inserirItens(kg, dadosKg);
console.log("Inserindo dados em rações...");
inserirItens(racoes, dadosRacoes);
console.log("Inserindo dados em sementes...");
inserirItens(sementes, dadosSementes);
console.log("Inserindo dados em vegetais...");
inserirItens(vegetais, dadosVegetais);
console.log("Inserindo dados na tabela de preços...");
inserirPrecos(dadosPrecos);
