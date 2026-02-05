import type { ResumeJson, ResumeWork } from "./types";
import { formatDateRange, joinTruthy } from "./format";
import { LinkIcon, LinkedInIcon, MailIcon } from "./icons";
import type { ReactNode } from "react";

type Props = {
  resume: ResumeJson;
};

function ContactItem({
  icon,
  href,
  text,
}: {
  icon: ReactNode;
  href?: string;
  text: string;
}) {
  const content = (
    <>
      <span className="orContactIcon">{icon}</span>
      <span className="orContactText">{text}</span>
    </>
  );

  if (!href) return <div className="orContact">{content}</div>;

  return (
    <a
      className="orContact orContactLink"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="orSectionTitle">
      <div className="orSectionRule" />
      <h2 className="orSectionHeading">{title}</h2>
    </div>
  );
}

function WorkItem({ item }: { item: ResumeWork }) {
  const dateRange = formatDateRange(item.startDate, item.endDate);

  return (
    <div className="orItem">
      <div className="orItemTopRow">
        <div className="orItemTitle">{item.company}</div>
        {dateRange ? <div className="orItemDates">{dateRange}</div> : null}
      </div>
      <div className="orItemSubRow">
        <div className="orItemSubtitle">{item.position}</div>
        {item.location ? (
          <div className="orItemMeta">{item.location}</div>
        ) : null}
      </div>
      {item.highlights?.length ? (
        <ul className="orBullets">
          {item.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function ResumeView({ resume }: Props) {
  const { basics } = resume;

  // const location = joinTruthy([
  //   basics.location?.city,
  //   basics.location?.region,
  //   basics.location?.countryCode,
  // ]);

  const websiteLabel = basics.url?.replace(/^https?:\/\//, "");
  const linkedinLabel = basics.linkedin?.replace(/^https?:\/\//, "");

  return (
    <article className="orPage" aria-label="Resume">
      <header className="orHeader">
        <h1 className="orName">{basics.name}</h1>
        {basics.label ? <div className="orLabel">{basics.label}</div> : null}
        {basics.summary ? <p className="orSummary">{basics.summary}</p> : null}

        <div className="orContacts" aria-label="Contact">
          {basics.email ? (
            <ContactItem
              icon={<MailIcon />}
              href={`mailto:${basics.email}`}
              text={basics.email}
            />
          ) : null}
          {basics.url ? (
            <ContactItem
              icon={<LinkIcon />}
              href={basics.url}
              text={websiteLabel ?? basics.url}
            />
          ) : null}
          {/* {location ? <ContactItem icon={<MapPinIcon />} text={location} /> : null} */}
          {basics.linkedin ? (
            <ContactItem
              icon={<LinkedInIcon />}
              href={basics.linkedin}
              text={linkedinLabel ?? basics.linkedin}
            />
          ) : null}
        </div>
      </header>

      {resume.work?.length ? (
        <section className="orSection">
          <SectionTitle title="Work Experience" />
          {resume.work.map((w) => (
            <WorkItem
              key={`${w.company}-${w.startDate ?? ""}-${w.position ?? ""}`}
              item={w}
            />
          ))}
        </section>
      ) : null}

      {resume.education?.length ? (
        <section className="orSection">
          <SectionTitle title="Education" />
          {resume.education.map((e) => {
            const title =
              joinTruthy([e.institution, e.area]) ??
              e.institution ??
              "Education";
            const subtitle = joinTruthy([e.studyType, e.score]);
            const dates = formatDateRange(e.startDate, e.endDate);

            return (
              <div
                className="orItem"
                key={`${e.institution ?? ""}-${e.area ?? ""}-${e.studyType ?? ""}`}
              >
                <div className="orItemTopRow">
                  <div className="orItemTitle">{title}</div>
                  {dates ? <div className="orItemDates">{dates}</div> : null}
                </div>
                {subtitle ? (
                  <div className="orItemSubtitle">{subtitle}</div>
                ) : null}
                {e.courses?.length ? (
                  <ul className="orBullets">
                    {e.courses.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </section>
      ) : null}

      {resume.skills?.length ? (
        <section className="orSection">
          <SectionTitle title="Skills" />
          <div className="orSkillsGrid">
            {resume.skills.map((s) => (
              <div className="orSkill" key={s.name}>
                <div className="orSkillName">{s.name}</div>
                {s.keywords?.length ? (
                  <div className="orSkillKeywords">{s.keywords.join(", ")}</div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
