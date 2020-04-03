  const signInStyle = {
    wrap:{
        minHeight: '520px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      container:{
        // backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        padding: '0 6px',
        height: '100%',
        position: 'fixed',
        overflow: 'auto',
      },
      paper:{
        backgroundColor: 'white', 
        margin: 'auto',
        // borderTop: 'solid 4px #2bae9f',
        borderRadius: '5px',
        padding: '0 2vw',
        minHeight: '70vh',
        boxSizing: 'border-box',
        // boxShadow: '0px 20px 4px rgba(0, 0, 0, 0.25)',
      },
      innerPaper:{
        margin: 'auto',
      },
      textContainer:{
        width: '100%',
        marginTop: '12px',
      },
      textBox:{
        width: '100%',
        "&$focused": {
          color: 'rgb(168,207,182)',
          fontWeight: "bold"
        },
        onFocus: 'rgb(168,207,182)'
      },
      buttonContainer:{
        textAlign:'center',
        // minWidth:250,
      },
      topBlank:{
        minHeight: '20vh',
      },
      signInText:{
        textAlign:'center',
        fontSize:'2em',
      },
      button:{
          textAlign:'center',
          marginTop:'35px',
          width:'220px',
          height:'53px',
          marginBottom:'25px',
          textSize:'100px',
          backgroundColor:'lightGrey',
      }
  };
  
  export default signInStyle;
  