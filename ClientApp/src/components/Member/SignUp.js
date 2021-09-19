import React from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  CloseButton,
  FormGroup,
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";

function SignUp(props) {
  // const [id, setId] = useState(null);
  const memberName = useSelector((state) => state.memberName);
  const memberEmail = useSelector((state) => state.memberEmail);
  const memberSecondId = useSelector((state) => state.memberSecondId);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .test({
        name: "passwordCheck",
        message:
          `one uppercase characters (A-Z) ,` +
          `one lowercase characters (a-z) ,` +
          `one Digits (0-9) ,` +
          `one Special characters`,
        test: function isValid(val) {
          let reg = /^(?=^.{8,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*$/;
          if (reg.test(val)) {
            return true;
          } else {
            return false;
          }
        },
      }),
    passwordAgain: yup.string().when("password", (password, schema) => {
      return password
        ? schema.oneOf([password], "Password must match").required()
        : schema;
    }),
    phone: yup.string(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  let initial = {
    username: memberName ?? "",
    password: "",
    passwordAgain: "",
    email: memberEmail ?? "",
    phone: "",
    terms: false,
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>Create Account</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={schema}
        enableReinitialize
        onSubmit={async (values) => {
          console.log(JSON.stringify(values));

          let data = Object.assign(memberSecondId, values);

          await fetch("/api/member/MemberSignUp", {
            method: "Post",
            body: JSON.stringify(data),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              dispatch({
                type: "LOG_IN",
                memberName: res.name,
                memberId: res.id,
                memberEmail: res.email,
              });

              dispatch({
                type: "SIGN_UP_MODAL_HIDE",
              });
            })
            .catch((err) => console.log(err));
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   actions.setSubmitting(false);
          // }, 1000);
        }}
        initialValues={initial}
      >
        {({ handleSubmit, handleChange, values, touched, isValid, errors }) => (
          <Form noValidate onSubmit={handleSubmit} style={{ padding: "15px" }}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="User Name"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password at least 8"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Re-enter password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter password"
                  name="passwordAgain"
                  value={values.passwordAgain}
                  onChange={handleChange}
                  isInvalid={errors.passwordAgain}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passwordAgain}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  isInvalid={errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
              />
            </Form.Group>
            <FormGroup className="mb-3" style={{float:"right"}}>
              <Button type="submit" style={{margin:"0 15px"}}>Sign Up</Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  dispatch({
                    type: "SIGN_UP_MODAL_HIDE",
                  });
                }}
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default SignUp;
