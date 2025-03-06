import FacilityCard from "@/components/page/facilityDetails/facilityCard";
import GraySection from "@/components/page/testDetails/grayPortion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { facilitiesData } from "@/constants/facilities";
import { testsData } from "@/constants/tests";
import { TFacility } from "@/types/facility";
import { capitalizeSentence } from "@/utils/capitalizeSentence";

type PageParams = Promise<{ id: string }>;

const FacilityDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;

  const facility = facilitiesData.find(
    (item: TFacility) => item.id === Number(id)
  );
  if (!facility) return <h1>Data not found</h1>;

  return (
    <section className="grid gap-6">
      {/* Patient details section */}
      <Card className="shadow-none">
        <CardHeader>
          <h1 className="text-2xl font-medium text-primary">Facility:</h1>
        </CardHeader>
        <CardContent>
          <FacilityCard facility={facility} />
        </CardContent>
      </Card>
      {/* facility Details section */}
      <Card className="shadow-none">
        <CardHeader>
          <h1 className="text-2xl font-medium text-primary">
            Facility Details:
          </h1>
        </CardHeader>
        <CardContent className="grid gap-10">
          <section>
            <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <span className="text-zinc-400">Facility ID</span>
                <span># {facility.id}</span>
              </li>
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <span className="text-zinc-400">Account Type</span>
                <span>{capitalizeSentence(facility.account_type)}</span>
              </li>
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <span className="text-zinc-400">Status</span>
                <span className="text-primary">
                  {capitalizeSentence(facility.status)}
                </span>
              </li>
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <span className="text-zinc-400">Representative Name</span>
                <span>
                  {facility.representative.first_name}{" "}
                  {facility.representative.first_name}
                </span>
              </li>
              <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <span className="text-zinc-400">Representative Phone</span>
                <span>{facility.representative.phone}</span>
              </li>
            </ul>
          </section>

          <section className="flex flex-col-reverse lg:flex-row gap-8">
            <section className="w-full grid gap-8">
              {/* doctors section */}
              <section className="grid gap-4">
                <h1 className="text-xl font-medium">Doctors</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {facility.doctors.map((item, idx) => (
                    <div key={idx}>
                      <GraySection>
                        <div className="grid gap-6">
                          <h2 className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
                            <span className="text-zinc-500">ID</span>
                            <span>{item.id}</span>
                          </h2>
                          <h2 className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
                            <span className="text-zinc-500">Name</span>
                            <span>
                              {item.first_name} {item.last_name}
                            </span>
                          </h2>
                          <h2 className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
                            <span className="text-zinc-500">Company</span>
                            <span>{item.company}</span>
                          </h2>
                          <h2 className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
                            <span className="text-zinc-500">Email</span>
                            <span>{item.email}</span>
                          </h2>
                          <h2 className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
                            <span className="text-zinc-500">Phone No</span>
                            <span>{item.phone}</span>
                          </h2>
                          <h2 className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
                            <span className="text-zinc-500">APT Number</span>
                            <span>{item.apt_number}</span>
                          </h2>
                          <h2 className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
                            <span className="text-zinc-500">NPI Number</span>
                            <span>{item.npi}</span>
                          </h2>
                        </div>
                      </GraySection>
                    </div>
                  ))}
                </div>
              </section>

              {/* disordes */}
              <section className="grid gap-4">
                <GraySection>
                  <h1 className="text-xl font-medium">Disorders:</h1>
                  <div className="flex flex-wrap gap-6">
                    <h2 className="text-lg">Metabolic</h2>
                    <ul className="text-zinc-500 grid gap-4">
                      {testsData[0].disorder_observation.metabolic.map(
                        (item, idx: number) => (
                          <li key={idx}>
                            {item.code} {item.description}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </GraySection>

                <GraySection>
                  <h1 className="text-xl font-medium">
                    Reasons for Skin Biopsy:
                  </h1>
                  <div className="flex gap-6">
                    <ul className="text-zinc-500 grid gap-4">
                      {testsData[0].reason_for_skin_biopsy.map(
                        (item, idx: number) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                </GraySection>

                <GraySection>
                  <h1 className="text-xl font-medium">Clinical Symptoms:</h1>
                  <div className="flex flex-wrap gap-6">
                    <h2 className="text-lg">Neck Pain</h2>
                    <ul className="text-zinc-500 grid gap-4">
                      {testsData[0].clinical_symptoms.neck_pain.map(
                        (item, idx: number) => (
                          <li key={idx}>
                            {item.code} {item.description} -{" "}
                            <span className="text-red-500">
                              {item.side} Side
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-6">
                    <h2 className="text-lg">Leg Pain</h2>
                    <ul className="text-zinc-500 grid gap-4">
                      {testsData[0].clinical_symptoms.neck_pain.map(
                        (item, idx: number) => (
                          <li key={idx}>
                            {item.code} {item.description} -{" "}
                            <span className="text-red-500">
                              {item.side} Side
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </GraySection>
              </section>
            </section>
          </section>
        </CardContent>
      </Card>
    </section>
  );
};

export default FacilityDetailsPage;
