const PatientCard = ({ bill, patient }) => {

  return (
    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Name </span>
        <span>
          {patient.first_name} {patient.last_name}
        </span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Insurance </span>
        <span>{patient.insurance_company}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Email </span>
        <span>{patient.email}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Member ID </span>
        <span>{patient.member_id}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Contact Number </span>
        <span>{patient.phone}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Reason for visit </span>
        <span>{patient.reasons[0]}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Address</span>
        <span>{patient.address}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Ethnicity</span>
        <span>{patient.ethnicity}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Gender</span>
        <span>{patient.gender}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Ordering Physician</span>
        <span>{bill.ordering_physician}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Death of Birth</span>
        <span>{patient.date_of_birth}</span>
      </li>
    </ul>
  );
};

export default PatientCard;
