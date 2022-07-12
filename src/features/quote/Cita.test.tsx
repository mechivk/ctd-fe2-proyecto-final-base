import { fireEvent, screen, waitFor } from "@testing-library/react";
import Cita from "./Cita";
import { render } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { NO_ENCONTRADO, NOMBRE_INVALIDO, MENSAJE_CARGANDO } from "./constants";

describe("Cita", () => {
  describe("Cuando renderizamos el componente", () => {
    test("No debe mostrar ninguna cita", async () => {
      render(<Cita />);
      const cita = screen.queryByText(NO_ENCONTRADO);
      expect(cita).toBeInTheDocument();
    });
  });

  describe("Cuando se ingresa un valor en el input", () => {
    test('Debe cambiar el texto del boton a "Obtener Cita"', async () => {
      render(<Cita />);

      const input = screen.queryByPlaceholderText(
        "Ingresa el nombre del autor"
      );
      if (input) userEvent.type(input, "a");

      await waitFor(() => {
        const buttonCita = screen.queryByText("Obtener Cita");
        expect(buttonCita).toBeInTheDocument();
      });
      await waitFor(() => {
        const buttonCitaAleatoria = screen.queryByText(
          "Obtener cita aleatoria"
        );
        expect(buttonCitaAleatoria).not.toBeInTheDocument();
      });
    });

    test("Debe cambiar el valor del input al valor ingresado", async () => {
      render(<Cita />);

      const input = screen.queryByPlaceholderText(
        "Ingresa el nombre del autor"
      );
      if (input) userEvent.type(input, "Marge");

      await waitFor(() => {
        expect(input).toHaveValue("Marge");
      });
    });
  });

  describe("Cuando la query se esta ejecutando", () => {
    test("Debe mostrar el mensaje de cargando", async () => {
      render(<Cita />);

      const button = screen.queryByText("Obtener cita aleatoria");
      if (button) fireEvent.click(button);

      await waitFor(() => {
        const mensajeCargando = screen.queryByText(MENSAJE_CARGANDO);
        expect(mensajeCargando).toBeInTheDocument();
      });
    });
  });

  describe("Cuando se borra el contenido del input", () => {
    it("No debe mostrarse ninguna cita", async () => {
      render(<Cita />);

      const inputChar = screen.getByPlaceholderText(
        "Ingresa el nombre del autor"
      );
      const buttonCita = screen.getByLabelText("Obtener cita aleatoria");
      fireEvent.change(inputChar, { target: { value: "bart" } });
      userEvent.click(buttonCita);
      expect(await screen.findByText("Bart Simpson")).toBeInTheDocument();
      const buttonBorrar = screen.getByLabelText("Borrar");
      userEvent.click(buttonBorrar);
      expect(await screen.findByText(NO_ENCONTRADO)).toBeInTheDocument();
    });

    test("Debe cambiar el valor del input a vacio", async () => {
      render(<Cita />);
      const input = screen.queryByPlaceholderText(
        "Ingresa el nombre del autor"
      );
      if (input) userEvent.type(input, "Marge");
      await waitFor(() => {
        expect(input).toHaveValue("Marge");
      });
      const buttonBorrar = screen.queryByText("Borrar");
      if (buttonBorrar) fireEvent.click(buttonBorrar);
      await waitFor(() => {
        expect(input).toHaveValue("");
      });
    });
  });

  describe("Cuando se ingresa un input valido", () => {
    it("Debe mostrar una cita del personaje ingresado", async () => {
      render(<Cita />);
      const inputChar = screen.getByPlaceholderText(
        "Ingresa el nombre del autor"
      );
      const buttonCita = screen.getByLabelText("Obtener cita aleatoria");
      fireEvent.change(inputChar, { target: { value: "homer" } });
      userEvent.click(buttonCita);
      expect(await screen.findByText("Homer Simpson")).toBeInTheDocument();
    });
  });

  describe("Cuando se ingresa un input invalido", () => {
    it("Debe mostrar un mensaje de error", async () => {
      render(<Cita />);
      const inputChar = screen.getByPlaceholderText(
        "Ingresa el nombre del autor"
      );
      const buttonCita = screen.getByLabelText("Obtener cita aleatoria");
      fireEvent.change(inputChar, { target: { value: "123" } });
      userEvent.click(buttonCita);
      expect(await screen.findByText(NOMBRE_INVALIDO)).toBeInTheDocument();
    });
  });
});
