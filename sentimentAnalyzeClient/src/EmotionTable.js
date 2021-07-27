import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
               Object.entries(this.props.emotions[0].emotion).map(function(mapentry) {
                console.log("This is mapping - ",mapentry)
                return (
                    <tr>
                    <td>{mapentry[0]}</td>
                    <td>{JSON.stringify(mapentry[1])}</td>
                    </tr>
                )
                })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;