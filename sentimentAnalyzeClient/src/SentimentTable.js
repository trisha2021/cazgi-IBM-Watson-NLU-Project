import React from 'react';
import './bootstrap.min.css';

class SentimentTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
                {console.log("This is mapping 1- ",this.props.emotions.keywords)}
            {
                
               Object.entries(this.props.emotions.keywords).map(function(mapentry) {
                console.log("This is mapping - ",mapentry[1].sentiment.label)
                return (
                    <tr>
                    <td>{mapentry[1].text}</td>
                    {mapentry[1].sentiment.label==='positive'? <td style={{color:'green'}}>{mapentry[1].sentiment.label}</td>:''}
                    {mapentry[1].sentiment.label==='negative'? <td style={{color:'red'}}>{mapentry[1].sentiment.label}</td>:''}
                    {mapentry[1].sentiment.label==='neutral'? <td style={{color:'orange'}}>{mapentry[1].sentiment.label}</td>:''}
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
export default SentimentTable;