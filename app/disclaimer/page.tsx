export const metadata = {
  title: "Disclaimer",
};

const disclaimer = `
The information contained on this website and in any research reports, articles, pitch decks, or other materials published by ThesisPoint (collectively, "Materials") is provided for informational and educational purposes only.

**Not Investment Advice.** The Materials do not constitute investment advice, financial advice, trading advice, or any other sort of advice, and you should not treat any of the content as such. ThesisPoint does not recommend that any security or financial instrument is suitable for any specific person.

**No Offer or Solicitation.** Nothing on this site constitutes an offer to sell or a solicitation of an offer to buy any security or financial product. Any investment decisions should be made only after consultation with qualified financial professionals who are aware of your individual circumstances.

**Accuracy and Completeness.** While we strive to provide accurate and timely information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the Materials. Any reliance you place on such information is strictly at your own risk.

**Forward-Looking Statements.** Materials may contain forward-looking statements that involve risks and uncertainties. Actual results may differ materially from those expressed or implied in such statements.

**Third-Party Data.** Market data, logos, and references to third parties are used for illustrative purposes only and do not imply endorsement or affiliation unless explicitly stated.

**Past Performance.** Past performance is not indicative of future results. All investments involve risk, including the possible loss of principal.

**Jurisdiction.** This website is not directed at residents of any jurisdiction where the publication or availability of the Materials would be contrary to local law or regulation.

For questions regarding this disclaimer, please contact research@thesispoint.com.
`;

export default function DisclaimerPage() {
  const paragraphs = disclaimer.trim().split("\n\n");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-midnight">Legal Disclaimer</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: May 2025</p>
      <div className="prose-research mt-10 space-y-6">
        {paragraphs.map((para, i) => {
          const html = para
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br />");
          return (
            <p
              key={i}
              className="text-text-muted"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        })}
      </div>
    </div>
  );
}
