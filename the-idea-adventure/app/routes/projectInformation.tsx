import Nav from "~/components/nav";

export default function ProjectInfo() {
    return (
        <>
            <Nav /> 
            <article className="projectInfoWrapper">
                <section>
                    <h2 className="title">To Whom It May Concern,</h2>
                    <h4>This is not just a small web game; this is an open invitation to debate.</h4>
                    <p>
                        This game has a restriction. The game’s characters go to sleep at 7 PM. Why? Because this small web game is targeted toward kids. Is it a bad idea to restrict a game from players? Probably. But I wish to start an open conversation on how we can better protect children and minors online. 
                    </p>
                </section>
                <section>
                    <p>However, a conversation needs to start somewhere, so I will start. What if games made with minors in mind were not just online, with chat rooms and cloud storage? What if we brought back the good old CD, like the old retro PC games? What about what I did in this game, which may be targeted toward younger kids? Well, I do believe restricting a game is the choice of the developer, and while it may not be a great idea, it did bring you here to read this, and in the end, that was the point.
                    </p>
                </section>
                  <section>
                    <p>This web game was created as part of my thesis on full-stack web development and was built using Better Auth, Drizzle ORM (Beta), and React Router. Thank you for taking the time out of your day to be here!
                    </p>
                </section>
            
           </article>
        </>
    )

}
