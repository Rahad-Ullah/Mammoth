import GraySection from "./grayPortion";

const GeneralTestDetails = ({ test }) => {
  return (
    <>
      <GraySection>
        <h1 className="text-xl font-medium">Disorder Observation:</h1>
        <div className="flex flex-wrap gap-6">
          <h2 className="text-lg">Metabolic</h2>
          <ul className="text-zinc-500 grid gap-4">
            {test.disorder_observation.metabolic.map((item, idx: number) => (
              <li key={idx}>
                {item.code} {item.description}
              </li>
            ))}
          </ul>
        </div>
      </GraySection>

      <GraySection>
        <h1 className="text-xl font-medium">Reason for Skin Biopsy:</h1>
        <div className="flex gap-6">
          <ul className="text-zinc-500 grid gap-4">
            {test.reason_for_skin_biopsy.map((item, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </GraySection>

      <GraySection>
        <h1 className="text-xl font-medium">Communication with Patient:</h1>
        <div className="flex gap-6">
          <ul className="text-zinc-500 grid gap-4">
            {test.communication_with_patient.map((item, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </GraySection>

      <GraySection>
        <h1 className="text-xl font-medium">Clinical Symptoms:</h1>
        <div className="flex flex-wrap gap-6">
          <h2 className="text-lg">Neck Pain</h2>
          <ul className="text-zinc-500 grid gap-4">
            {test.clinical_symptoms.neck_pain.map((item, idx: number) => (
              <li key={idx}>
                {item.code} {item.description} -{" "}
                <span className="text-red-500">{item.side} Side</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-6">
          <h2 className="text-lg">Leg Pain</h2>
          <ul className="text-zinc-500 grid gap-4">
            {test.clinical_symptoms.neck_pain.map((item, idx: number) => (
              <li key={idx}>
                {item.code} {item.description} -{" "}
                <span className="text-red-500">{item.side} Side</span>
              </li>
            ))}
          </ul>
        </div>
      </GraySection>

      <GraySection>
        <h1 className="text-xl font-medium">Biopsy Sample:</h1>
        <div className="flex gap-6 px-2">
          <ul className="text-zinc-500 grid gap-4 w-full">
            {test.biopsy_samples.map((item, idx: number) => (
              <li key={idx} className="flex flex-wrap justify-between">
                <p>
                  {idx + 1}. Sample taken from{" "}
                  <span className="text-primary font-medium">
                    ({item.abbreviation}){item.location}
                  </span>{" "}
                  <span className="text-red-500 capitalize">{item.side}</span>{" "}
                  Side
                </p>
                <p className="text-sm text-zinc-400">
                  Specimen Id: {item.specimen_id}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </GraySection>
    </>
  );
};

export default GeneralTestDetails;
