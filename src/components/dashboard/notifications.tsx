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
            {notifications && notifications.map((notification, index) => {
              return (
                <li key={index}>
                  <span className="pink-text">{notification.user} </span>
                  <span>{notification.content}</span>
                  <div className="note-date grey-text">{moment(notification.time.toDate()).fromNow()}</div>
                </li>
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