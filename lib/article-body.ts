export function getDefaultArticleBody(title: string, excerpt: string) {
  return `
<h2>Overview</h2>
<p>${excerpt}</p>
<h2>Key Themes</h2>
<p>Our research team continues to monitor fundamental drivers, valuation, and risk-reward across the coverage universe. This note summarizes our current thinking and highlights catalysts for the next 6–12 months.</p>
<h3>What We're Watching</h3>
<ul>
<li>Earnings revisions and consensus dispersion</li>
<li>Policy and regulatory developments</li>
<li>Competitive dynamics and market share shifts</li>
</ul>
<h2>Investment Implications</h2>
<p>We believe disciplined investors should focus on quality compounders with visible earnings visibility. Position sizing should reflect conviction and liquidity considerations.</p>
<h2>Conclusion</h2>
<p><strong>${title}</strong> remains a focal point of our ongoing coverage. Contact us for the full model and sensitivity analysis.</p>
`;
}
