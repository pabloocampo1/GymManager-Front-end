
  export function setData(data) {
       const objects = [];
      
        data.map((item) => {
          const save = {
            month: "",
            seoul: ""
          }
            switch (item.month) {
              case 1:
                save.month = "Ene";
                save.seoul = item.amount;
                break;
              case 2:
                save.month = "Feb";
                save.seoul = item.amount;
                break;
              case 3:
                save.month = "Mar";
                save.seoul = item.amount;
                break;
              case 4:
                save.month = "Abr";
                save.seoul = item.amount;
                break;
              case 5:
                save.month = "May";
                save.seoul = item.amount;
                break;
              case 6:
                save.month = "Jun";
                save.seoul = item.amount;
                break;
              case 7:
                save.month = "Jul";
                save.seoul = item.amount;
                break;
              case 8:
                save.month = "Ago";
                save.seoul = item.amount;
                break;
              case 9:
                save.month = "Sep";
                save.seoul = item.amount;
                break;
              case 10:
                save.month = "Oct";
                save.seoul = item.amount;
                break;
              case 11:
                save.month = "Nov";
                save.seoul = item.amount;
                break;
              case 12:
                save.month = "Dic";
                save.seoul = item.amount;
                break;
            
              default:
                break;
            }
          objects.push(save)
        });

        return objects;
  }
  
  export function valueFormatter(value) {
    return `${value}$`;
  }
  