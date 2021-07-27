import React from 'react';
import './bootstrap.min.css';

class EmotionUrlTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
                {console.log("This is mapping 1- ",this.props.emotions.keywords)}
            {
                
               Object.entries(this.props.emotions.keywords).map(function(mapentry) {
                console.log("This is mapping - ",mapentry)
                return (
                    <tr>
                    <td>{mapentry[1].text}</td>
                    {
                     Object.entries(mapentry[1].emotion).map(function(emotionEntry) {
                             return (
                            <tr>
                                <td>{emotionEntry[0]}</td>
                                <td>{emotionEntry[1]}</td>
                            </tr>)
                     })}
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
export default EmotionUrlTable;