const TestInfo = ({ bill }) => {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Report No.</span>
        <span># {bill?.report?.report_no}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Sensory Symptoms</span>
        <span>{bill?.patient?.sensorySymptoms[0]}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Status</span>
        <span className="text-primary">{bill?.report?.status}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Ordering Provider</span>
        <span className="text-primary">{bill?.report?.ordering_provider}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">CPT(s)</span>
        <span>
          {" "}
          {bill?.report?.icd.length > 0
            ? bill?.report?.cpt.map((item: string) => item).join(", ")
            : "N/A"}
        </span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Apply Date</span>
        <span>{new Date(bill?.report?.apply_date).toLocaleString()}</span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Ordering Physician</span>
        <span className="text-primary">
          {bill?.report?.doctor?.firstname || "N/A"}{" "}
          {bill?.report?.doctor?.firstname}
        </span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">ICD(s)</span>
        <span>
          {bill?.report?.icd.length > 0
            ? bill?.report?.icd.map((item: string) => item).join(", ")
            : "N/A"}
        </span>
      </li>
      <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span className="text-zinc-400">Report Date</span>
        <span className="text-red-500">
          {new Date(bill?.report?.report_date).toLocaleString()}
        </span>
      </li>
    </ul>
  );
};

export default TestInfo;
