export default function Rooms(props:any){
    console.log("",props)
   return(
    <div>
         <img src={props.image} alt=""  />
      <h3>{props.nom}</h3>
      <p>Prix: {props.Prix} FCFA</p>
    </div>
   )

    
}

