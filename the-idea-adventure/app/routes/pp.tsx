import Nav from "~/components/nav";

export default function pp() {
    return (<>
      <Nav></Nav>
      <section><h1>Privacy Policy</h1></section>
      <section><p>We care about you privacy.</p></section>

    <section>
        <h3>Login</h3>
        <p>The Idea Adventure uses a third party named Better Auth to authenticate users. We only save the data that is necessary for safe login and to save game progress.</p>
    </section>

    <section>
        <h3>How We Handle Your Data</h3>
        <p>We do not share any data. Your game progress is saved in our database and will be deleted if you choose to part ways with us.</p>
    </section>

    <section>
        <h3>Cookies</h3>
        <p>Cookies may be used to help improve the user experience.</p>
    </section>

    <section>
        <h3>Your Rights</h3>
        <p>You have the right to request that we delete your data. All of your data will be removed from our database.</p>
    </section>

    <section>
        <h3>Changes</h3>
        <p>This policy may be changed if needed. If you continue to use this website, you accept the new policy.</p>
    </section>
</>
    )
}