const Persons = ({ persons, removeRecord }) => {
    return <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name} {person.number}
          <button onClick={() => removeRecord(person.id)}>Delete</button>
          </li>
        )}
      </ul>
}

export default Persons