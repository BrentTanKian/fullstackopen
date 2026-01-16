import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({ text, value }) => <div>{text} {value}</div>

const Statistics = (props) => {
  const goodCount = props.allClicks.filter(ele => ele === 'G').length;
  const neutralCount = props.allClicks.filter(ele => ele === 'N').length;
  const badCount = props.allClicks.filter(ele => ele === 'B').length;
  const all = goodCount + neutralCount + badCount
  const average = (goodCount - badCount) / all
  const positive = (goodCount / all) * 100

  if (props.allClicks.length === 0) {
    return (
      <div>
        No Feedback Given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={goodCount} />
      <StatisticLine text="neutral" value={neutralCount} />
      <StatisticLine text="bad" value={badCount} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllArray] = useState([])

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAllArray(allClicks.concat('G'))
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAllArray(allClicks.concat('N'))
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAllArray(allClicks.concat('B'))
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      <Statistics allClicks={allClicks} />
    </div>
  )
}

export default App