const postContent = `<h2>How to be happier</h2>
<article>
<div class="nhsuk-grid-row">
<div class="nhsuk-grid-column-two-thirds"><section>
<p data-block-key="zaygp"><b>Try our 6 tips to help you be happier, more in control, and able to cope better with life's ups and downs.</b></p>

</section><section>
<h2 data-block-key="26vk7">Manage your stress levels</h2>
<p data-block-key="u1lfr">If you have a lot of stress in your life, find ways to reduce it, such as learning a few <a href="https://www.nhs.uk/mental-health/self-help/tips-and-support/time-management-tips/">time-management techniques</a>.</p>
<p data-block-key="hpaov">Introduce regular exercise and time to yourself. These are positive changes. Taking control of your time in this way can effectively reduce stress.</p>
<p data-block-key="ebxlg">If you have feelings of anxiety along with your stress, breathing techniques can help. Try this <a href="https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/">breathing exercise for stress</a>.</p>

</section><section>
<h2 data-block-key="yz51f">Enjoy yourself</h2>
<p data-block-key="91zkk">Doing things that you enjoy is good for your emotional wellbeing.</p>
<p data-block-key="7nhyw"><strong>Simple activities like watching sports</strong> with a friend, having a soak in the bath or meeting up with friends for coffee can all improve your day.</p>
<p data-block-key="yywyl">Doing something you're good at, such as cooking or dancing, is a good way to enjoy yourself and have a sense of achievement.</p>
<p data-block-key="8fd3f">Try to avoid things that seem enjoyable at the time but make you feel worse afterwards, such as drinking too much alcohol or eating junk food.</p>

</section><section>
<h2 data-block-key="hihpc">Boost your self-esteem</h2>
<p data-block-key="1r6yo"><a href="https://www.nhs.uk/mental-health/self-help/tips-and-support/raise-low-self-esteem/">Self-esteem</a> is the way you feel about yourself.</p>
<p data-block-key="7dc9s">The best way to improve your self-esteem is to treat yourself as you'd treat a valued friend, in a positive but honest way.</p>
<p data-block-key="7b37f">Notice when you're putting yourself down, such as thinking, "You're so stupid for not getting that job", and instead think, "Would I say that to my best friend?". You probably wouldn't.</p>
<p data-block-key="ew9o2">Tell yourself something positive instead, such as: "You're a bright person, you'll get the next job".</p>

</section><section>
<h2 data-block-key="4bhwz">Have a healthy lifestyle</h2>
<h3 data-block-key="u3y5e">Limit your alcohol intake</h3>
<p data-block-key="5i4w4">When times are hard, it's tempting to drink alcohol because it "numbs" painful feelings.</p>
<p data-block-key="b53wx">But it can exaggerate some feelings and make you feel angry or aggressive. It can also make you feel more depressed.</p>
<p data-block-key="x78gp">Read more about the effects of alcohol on your health and get simple tips to help you cut down.</p>

</section></div>
</div>
</article>`;

const dummyData = {
  users: [
    {
      username: "geevadon",
      email: "geevadon@gmail.com",
      password: "1234",
      role: "admin",
    },
    {
      username: "jessica",
      email: "jessica@gmail.com",
      password: "1234",
    },
    {
      username: "doe",
      email: "doe@gmail.com",
      password: "1234",
    },
  ],

  categories: [
    { id: "62d5bc60e8d2c62efabfa63a", name: "ONG" },
    { id: "62d5bc60e8d2c62efabfa63b", name: "Reportage" },
    { id: "62d5bc60e8d2c62efabfa63c", name: "Scolarité" },
    { id: "62d5bc60e8d2c62efabfa63d", name: "Démographie" },
    { id: "62d5bc60e8d2c62efabfa63e", name: "NTIC" },
  ],

  posts: [
    {
      _id: "62d5fe8c105fec39ee6a09ed",
      title: "Post number one",
      content: postContent,
      category: "62d5bc60e8d2c62efabfa63a",
      tags: "tag 1, tag 2, tag 3",
      status: "published",
    },
    {
      _id: "62d5fe8c105fec39ee6a09f0",
      title: "Post number two",
      content: postContent,
      category: "62d5bc60e8d2c62efabfa63b",
      tags: "tag 1, tag 2",
    },
    {
      _id: "62d5fe8c105fec39ee6a09ef",
      title: "Post number three",
      content: postContent,
      category: "62d5bc60e8d2c62efabfa63d",
      status: "published",
    },
    {
      _id: "62d5fe8c105fec39ee6a09ee",
      title: "Post number four",
      content: postContent,
      category: "62d5bc60e8d2c62efabfa63a",
      tags: "tag 1",
      status: "published",
    },
    {
      _id: "62d5fe8c105fec39ee6a0911",
      type: "survey",
      title: "Post survey one",
      content: postContent,
      tags: "tag 1",
      status: "published",
    },
    {
      _id: "62d5fe8c105fec39ee6a0912",
      type: "survey",
      title: "Post survey two",
      content: postContent,
      tags: "tag 1",
      status: "published",
    },
    {
      _id: "62d5fe8c105fec39ee6a0915",
      type: "survey",
      title: "Post survey three",
      content: postContent,
      tags: "tag 1",
      status: "published",
    },
    {
      _id: "62d5fe8c105fec39ee6a0916",
      type: "survey",
      title: "Post survey four",
      content: postContent,
      tags: "tag 1",
      status: "published",
    },
    {
      _id: "62d5fe8c105fec39ee6a0913",
      type: "ad",
      title: "Post pub one",
      content: postContent,
      tags: "tag 1",
      status: "published",
    },
    {
      _id: "62d5fe8c105fec39ee6a0914",
      type: "ad",
      title: "Post pub two",
      content: postContent,
      tags: "tag 1",
      status: "published",
    },
    {
      _id: "62d5fe8c105fec39ee6a0917",
      type: "ad",
      title: "Meilleure pub de l'année",
      content: postContent,
      tags: "tag 1",
      status: "published",
    },
  ],

  comments: [
    {
      authorName: "Jessica Honey",
      authorEmail: "jesshon@gmail.com",
      content: "I love the article. Thanks for sharing",
      post: "62d5fe8c105fec39ee6a09ed",
    },
    {
      authorName: "Guess User 1",
      authorEmail: "guessuser1@gmail.com",
      content: "Guess user 1 comment",
      post: "62d5fe8c105fec39ee6a09ed",
    },
    {
      authorName: "Guess User 2",
      authorEmail: "guessuser2@gmail.com",
      content: "Guess user 2 comment",
      post: "62d5fe8c105fec39ee6a09f0",
    },
    {
      authorName: "Guess User 3",
      authorEmail: "guessuser3@gmail.com",
      content: "Guess user 3 comment",
      post: "62d5fe8c105fec39ee6a09f0",
    },
    {
      authorName: "Guess User 4",
      authorEmail: "guessuser4@gmail.com",
      content: "Guess user 4 comment",
      post: "62d5fe8c105fec39ee6a09f0",
    },
    {
      authorName: "Guess User 5",
      authorEmail: "guessuser5@gmail.com",
      content: "Guess user 5 comment",
      post: "62d5fe8c105fec39ee6a09ef",
    },
  ],
};

export default dummyData;
