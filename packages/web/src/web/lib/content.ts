/** Shared, language-independent site constants. */
export const CONTACT = {
  phoneDisplay: "+351 962 804 636",
  phoneHref: "tel:+351962804636",
  whatsapp: "https://wa.me/351962804636",
  email: "bernardo.bleck@century21.pt",
  emailHref: "mailto:bernardo.bleck@century21.pt",
};

export const GUIDE_PATH = "/guide/bleckteam-portugal-buyers-guide.pdf";

export interface Testimonial {
  quote: string;
  author: string;
  place: string;
}

/** Real client reviews — kept verbatim, never translated. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Bernardo is a seasoned professional, provides exceptional client service, and is a pleasure to work with. I'm so thankful Bernardo managed our contract and navigated us seamlessly through each step of the process. He went above and beyond to make sure we had everything we need and was timely in all communication. Working with Bernardo was an excellent experience — anyone would be fortunate to have the chance to do business with him!",
    author: "Hannah & John F.",
    place: "United States",
  },
  {
    quote:
      "Bernardo is knowledgeable, resourceful and most helpful. He took care to find out what kind of area and what kind of property suited us. He was patient and guided us in the negotiations that led to the purchase of a property that met our requirements. He has extensive knowledge of the rental and purchase market and, for the non-Portuguese speaker, his ready command of English eases communication. We would recommend him to anyone seeking to rent or buy a property in Lisbon.",
    author: "Gavin & Rosan",
    place: "Hong Kong",
  },
  {
    quote:
      "São pessoas dinâmicas, extremamente profissionais, compreensíveis e atentas às necessidades e preocupações dos clientes. Nunca hesitaram em nos esclarecer e tranquilizar, independentemente do momento do dia. Graças ao trabalho incansável da equipa, conseguimos vender ambas as propriedades e adquirir um apartamento na localização desejada. Estamos infinitamente gratos à Diana e ao Bernardo por nos guiarem nesta jornada com tanta dedicação e apoio.",
    author: "Maria Amália Tinoco",
    place: "Portugal",
  },
  {
    quote:
      "We wanted to truly thank you for all the assistance over the past several months — from helping us find the right property to guiding us through the process. After dealing with several agents it quickly became obvious that you were the only realtor we needed. Your help didn't end with the sale; you went above and beyond in everything from helping with utilities to making us feel comfortable purchasing a property in Portugal.",
    author: "Glenn & Kathy B.",
    place: "United States",
  },
  {
    quote:
      "I had a wonderful experience with Bernardo Bleck as my realtor in finding my property in Portugal. I had limited time and felt quite a bit of stress as this was my first time purchasing foreign property. Bernardo listened to what I wanted, found great properties to see in a short period, and was prepared, organized, knowledgeable and quick to respond. He eased my mind multiple times through the process.",
    author: "San Das",
    place: "United States",
  },
  {
    quote:
      "As nossas dúvidas e incertezas, com o Bernardo e a Diana, em menos de 1 mês passaram a certezas e confirmações. Desde o início, a simpatia, o profissionalismo e a dedicação foram constantes. Estamos muito felizes pelo processo ter corrido tão bem e sabemos que também estão felizes por nós. Não podíamos ter escolhido melhor parceria para concretizar o nosso objetivo.",
    author: "Cláudia Marques & Tiago Almeida",
    place: "Portugal",
  },
];
