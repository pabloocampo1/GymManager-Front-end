export const formatMonth = (month) => {
    let monthToString = "";
       switch (month) {
              case 1:
                monthToString = "Ene";
              
                break;
              case 2:
              monthToString  = "Feb";
              
                break;
              case 3:
             monthToString = "Mar";
              
                break;
              case 4:
             monthToString = "Abr";
              
                break;
              case 5:
             monthToString = "May";
              
                break;
              case 6:
             monthToString = "Jun";
              
                break;
              case 7:
             monthToString = "Jul";
              
                break;
              case 8:
             monthToString = "Ago";
              
                break;
              case 9:
             monthToString = "Sep";
              
                break;
              case 10:
             monthToString = "Oct";
              
                break;
              case 11:
             monthToString = "Nov";
              
                break;
              case 12:
             monthToString = "Dic";
              
                break;
            
              default:
                break;
            }

     
    

    return monthToString;

};