exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  const { name, message } = data;

  console.log("Yangi fikr:", name, message);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Rahmat, ${name}! Fikringiz qabul qilindi.`
    })
  };
};
