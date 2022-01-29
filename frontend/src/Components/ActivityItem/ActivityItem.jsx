import './ActivityItem.scss'
import deleteImg from '../../assests/trash.svg'

export default function ActivityItem({
  startTime,
  finishTime,
  distance,
  type,
  time,
  velocity,
  months,
  onDeleteActivity,
  _id,
}) {
  return (
    <div className="activity-item">
      <p className="activity-item__info">
        {months[new Date(startTime).getMonth()]} {new Date(startTime).getDate()}
      </p>
      <p className="activity-item__info">{type}</p>
      <p className="activity-item__info">{distance} km</p>
      <p className="activity-item__info">{time}</p>
      <p className="activity-item__info">{velocity}</p>
      <span onClick={() => onDeleteActivity(_id)}>
        <img src={deleteImg} alt="" />
      </span>
    </div>
  )
}
