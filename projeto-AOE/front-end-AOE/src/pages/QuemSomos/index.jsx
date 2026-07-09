import './style.css'

export default function QuemSomos() {
	return (
		<div className="quemsomos-container">
			<header className="qs-hero">
				<h1>Quem Somos</h1>
				<p className="lead">Institucional — Contato, Suporte e Operações</p>
			</header>

			<section className="qs-missao">
				<h2>Nossa Missão</h2>
				<p>
					Prover suporte operacional, segurança e comunicação eficiente entre o
					mar e as bases em terra, garantindo respostas rápidas em situações
					de emergência e excelência nas operações cotidianas.
				</p>
			</section>

			<section className="qs-vision-values">
				<div className="qs-vision">
					<h3>Visão</h3>
					<p>
						Ser referência nacional em operações marítimas e suporte de
						contingência, mantendo equipes treinadas e tecnologia de ponta.
					</p>
				</div>

				<div className="qs-values">
					<h3>Valores</h3>
					<ul>
						<li>Segurança em primeiro lugar</li>
						<li>Transparência e responsabilidade</li>
						<li>Agilidade no atendimento</li>
						<li>Compromisso com a comunidade</li>
					</ul>
				</div>
			</section>

			<section className="qs-timeline">
				<h2>Histórico</h2>
				<ol>
					<li><strong>Fundação:</strong> Estabelecimento das primeiras bases em terra.</li>
					<li><strong>Expansão:</strong> Ampliação das operações para Macaé, Santos e RJ.</li>
					<li><strong>Modernização:</strong> Implementação de canais de contingência internacional.</li>
				</ol>
			</section>

			<section className="qs-team">
				<h2>Equipe</h2>
				<p>Profissionais treinados em operações marítimas, suporte técnico e gestão de crise.</p>
			</section>
		</div>
	)
}