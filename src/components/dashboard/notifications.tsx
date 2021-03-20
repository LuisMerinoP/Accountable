import { INotification } from './../../../functions/src/index';
import moment from 'moment';

const Notifications = ( { notifications }:{ notifications:INotification[] | undefined })  => {
  if (notifications) {
    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">Notifications</span>
            <ul className="notifications">
            { notifications && notifications.map( (notification, index) => {
              const date = moment(notification.time.toDate()).calendar();
              return (
              <div key={index}>
                {notification.content + ' ' + notification.user + ' ' + date}
              </div>
              )
            })}  
            </ul>
          </div>
        </div>
      </div>
    )
  } else {
    return(
      <div>
        <p> Loading notifications... </p>
      </div>
    )
  }
}

export default Notifications;